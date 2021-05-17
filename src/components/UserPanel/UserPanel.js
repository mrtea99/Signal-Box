import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import UserName from "../UserSwitcher/UserName/UserName.js";
import SessionItemCard from "./SessionItemCard/SessionItemCard.js";

import styles from "./UserPanel.module.css";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";

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
  });

  // const sessionSections = {};

  // userSessions.forEach(session => {
  //   if (session.type === "work") {
  //     sessionSections.working = sessionSections.working || [];

  //     sessionSections.working.push(session)
  //   }
  // });

  // console.log(sessionSections)

  return (
    <>
      <h2>
        Queue for <UserName userId={displayUser} />
      </h2>
      <ul className={styles.sessionsList}>
        {userSessions.map((session) => (
          <li key={session.sessionId} className={styles.sessionItem}>
            <SessionItemCard session={session} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPanel;
