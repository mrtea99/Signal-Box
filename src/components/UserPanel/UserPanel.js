import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import UserName from "../UserSwitcher/UserName/UserName.js";
import SessionItemCard from "./SessionItemCard/SessionItemCard.js";
import QueueWrapper from "./QueueWrapper/QueueWrapper.js";

import styles from "./UserPanel.module.css";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

import { getShiftName } from "../../utils/getShiftTime.js";
import DateTimeFormatter from "../DateTimeFormatter/DateTimeFormatter.js";

function UserPanel() {
  const { userId } = useParams();
  const activeUser = useSelector(selectCurrentUser);
  const displayUser = parseInt(userId) || activeUser;

  const userSessions = useSelector((state) => {
    const allSessions = state.sessions.sessionsList;

    const thisUserSessions = allSessions.filter(
      (session) =>
        (session.secondaryUser === displayUser ||
          (session.user === displayUser && session.type === "work")) &&
        !["consign", "activate", "deactivate"].includes(session.type) &&
        session.endTime === null
    );
    return thisUserSessions;
  }).sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  const activeSessions = userSessions.filter((session) => {
    if (session.type === "work") {
      return true;
    }

    if (session.type === "flag" && session.extra !== "waiting") {
      return true;
    }

    return false;
  });

  const waitingSessions = userSessions.filter((session) => {
    if (session.type === "flag" && session.extra === "waiting") {
      return true;
    }

    return false;
  });

  const todoSessions = userSessions.filter((session) => {
    if (session.type === "assign" || session.type === "qa") {
      return true;
    }

    return false;
  });

  var sessionSections = [{ name: "overdue", sessions: [] }];

  todoSessions.forEach((session) => {
    const sessionDate = new Date(session.startTime);
    const nowDate = new Date();

    if (sessionDate < nowDate) {
      sessionSections
        .find((section) => section.name === "overdue")
        .sessions.push(session);
    } else {
      // Make a 'day' name from time at midnight
      const dateMidnight = new Date(
        sessionDate.getFullYear(),
        sessionDate.getMonth(),
        sessionDate.getDate(),
        0,
        0,
        0
      );

      const timezoneOffset = dateMidnight.getTimezoneOffset() * -1 * 60000;
      const sessionName = dateMidnight.getTime() + timezoneOffset;

      // Find or make new day
      let sessionDay = sessionSections.find(
        (section) => section.name === sessionName
      );

      if (!sessionDay) {
        sessionSections.push({ name: sessionName, shifts: [] });
        sessionDay = sessionSections[sessionSections.length - 1];
      }

      // Find or make new shift in day
      const shiftName = getShiftName(sessionDate) || "Unknown";

      let sessionShift = sessionDay.shifts.find(
        (shift) => shift.name === shiftName
      );

      if (!sessionShift) {
        sessionDay.shifts.push({ name: shiftName, sessions: [] });
        sessionShift = sessionDay.shifts[sessionDay.shifts.length - 1];
      }
      sessionShift.sessions.push(session);
    }
  });

  return (
    <main className={styles.main}>
      <h2>
        Queue for <UserName userId={displayUser} />
      </h2>
      <div className={styles.queuesContainer}>
        <section className={`${styles.queue} ${styles.queueActive}`}>
          <QueueWrapper title="Active">
            <ul className={styles.sessionsList}>
              {activeSessions.map((session) => (
                <li key={session.sessionId} className={styles.sessionItem}>
                  <SessionItemCard session={session} />
                </li>
              ))}
            </ul>
          </QueueWrapper>
        </section>
        <section className={`${styles.queue} ${styles.queueTodo}`}>
          <QueueWrapper title="To do">
            {sessionSections.map((section) => (
              <ul key={`${section.name}`} className={styles.sessionSection}>
                {(section.sessions && section.sessions.length) ||
                (section.shifts && section.shifts.length) ? (
                  <li>
                    {section.name === "overdue" ? (
                      <h4
                        className={`${styles.sectionTitle} ${styles.sectionTitleOverdue}`}
                      >
                        Due
                      </h4>
                    ) : (
                      <h4 className={styles.sectionTitle}>
                        <DateTimeFormatter
                          date={new Date(section.name)}
                          hideTime={true}
                        />
                      </h4>
                    )}

                    {section.sessions ? (
                      <ul className={styles.sessionsList}>
                        {section.sessions.map((session) => (
                          <li
                            key={session.sessionId}
                            className={styles.sessionItem}
                          >
                            <SessionItemCard session={session} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className={styles.sessionSubSection}>
                        {section.shifts.map((shift) => (
                          <li key={`${section.name}-${shift.name}`}>
                            <h4 className={styles.subDectionTitle}>
                              {shift.name}
                            </h4>
                            <ul className={styles.sessionsList}>
                              {shift.sessions.map((session) => (
                                <li
                                  key={session.sessionId}
                                  className={styles.sessionItem}
                                >
                                  <SessionItemCard session={session} />
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : null}
              </ul>
            ))}
          </QueueWrapper>
        </section>
        <section className={`${styles.queue} ${styles.queueWaiting}`}>
          <QueueWrapper title="Waiting">
            <ul className={styles.sessionsList}>
              {waitingSessions.map((session) => (
                <li key={session.sessionId} className={styles.sessionItem}>
                  <SessionItemCard session={session} />
                </li>
              ))}
            </ul>
          </QueueWrapper>
        </section>
      </div>
    </main>
  );
}

export default UserPanel;
