import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import SessionCard from "../RunEditor/Stage/SessionCard/SessionCard.js";
import UserName from "../UserSwitcher/UserName/UserName.js";
import Stopwatch from "../RunEditor/Stage/SessionDuring/Stopwatch/Stopwatch.js";
import Timer from "../Timer/Timer.js";

import getFlagName from "../../utils/getFlagName.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";
// import { selectRun } from "../RunList/runsSlice.js";

function UserPanel() {
  const { userId } = useParams();
  const activeUser = useSelector(selectCurrentUser);
  const displayUser = parseInt(userId) || activeUser;

  const userSessions = useSelector((state) => {
    const allSessions = state.sessions.sessionsList;

    const thisUserSessions = allSessions.filter(
      (session) =>
        session.user === displayUser &&
        !["consign", "activate", "deactivate"].includes(session.type) &&
        session.endTime === null
    );
    return thisUserSessions;
  });

  // const getRunName = function (runId) {
  //   const run = useSelector((state) => selectRun(state, runId));
  // };

  const history = useHistory();
  const goToSession = function (session) {
    let goToPath = "";
    switch (session.type) {
      case "work":
      case "assign":
        goToPath = `/run/${session.runId}/${session.stage}`;
        break;
      case "flag":
      case "qa":
        goToPath = `/run/${session.runId}/${session.stage}/${session.sessionId}`;
        break;
      default:
        break;
    }

    if (goToPath) {
      history.push(goToPath);
    }
  };

  return (
    <>
      <h2>
        Que for <UserName userId={displayUser} />
      </h2>
      <ul>
        {userSessions.map((session) => (
          <li key={session.sessionId}>
            <SessionCard
              type={
                session.type === "flag"
                  ? getFlagName(session.amount)
                  : session.type
              }
              title={session.type}
              onClick={() => goToSession(session)}
            >
              <Stopwatch>
                <Timer startTime={session.startTime} />
              </Stopwatch>
            </SessionCard>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPanel;
