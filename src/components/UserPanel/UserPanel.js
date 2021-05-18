import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import UserName from "../UserSwitcher/UserName/UserName.js";
import SessionItemCard from "./SessionItemCard/SessionItemCard.js";
import QueueWrapper from "./QueueWrapper/QueueWrapper.js";

import styles from "./UserPanel.module.css";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

import { getShiftName } from "../../utils/getShiftTime.js";

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
      // sessionSections
      //   .find((section) => section.name === "upcoming")
      //   .sessions.push(session);

      // Make a 'day' name with time at midnight
      const sessionName = new Date(
        sessionDate.getFullYear(),
        sessionDate.getMonth(),
        sessionDate.getDate(),
        0,
        0,
        0
      ).getTime();

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
              <ul key={`${section.name}`}>
                <li>
                  <h4>
                    {section.name === "overdue"
                      ? "Overdue"
                      : new Date(section.name).toISOString()}
                  </h4>
                  <ul className={styles.sessionsList}>
                    {section.sessions
                      ? section.sessions.map((session) => (
                          <li
                            key={session.sessionId}
                            className={styles.sessionItem}
                          >
                            <SessionItemCard session={session} />
                          </li>
                        ))
                      : section.shifts.map((shift) => (
                          <li key={`${section.name}-${shift.name}`}>
                            <h4>{shift.name}</h4>
                            <ul>
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
                </li>
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
