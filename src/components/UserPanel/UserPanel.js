import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import SessionCard from "../RunEditor/Stage/SessionCard/SessionCard.js";
import UserName from "../UserSwitcher/UserName/UserName.js";
import Stopwatch from "../RunEditor/Stage/SessionDuring/Stopwatch/Stopwatch.js";
import Timer from "../Timer/Timer.js";
import SessionDetails from "../SessionList/SessionDetails/SessionDetails.js";
import ModalControl from "../Modal/ModalControl/ModalControl.js";

import styles from "./UserPanel.module.css";

import getFlagName from "../../utils/getFlagName.js";
import getSessionName from "../../utils/getSessionName.js";

import { selectCurrentUser } from "../UserSwitcher/usersSlice.js";
// import { selectRun } from "../RunList/runsSlice.js";

import { useTranslation } from "react-i18next";
import CheckCloser from "../CheckCloser/CheckCloser.js";
import Button from "../Button/Button.js";

function UserPanel() {
  const { t } = useTranslation();

  const { userId } = useParams();
  const activeUser = useSelector(selectCurrentUser);
  const displayUser = parseInt(userId) || activeUser;

  const userSessions = useSelector((state) => {
    const allSessions = state.sessions.sessionsList;

    const thisUserSessions = allSessions.filter(
      (session) =>
        (session.secondaryUser === displayUser ||
          (session.user === displayUser && session.type === "work")) &&
        !["consign", "activate", "deactivate", "flag"].includes(session.type) &&
        session.endTime === null
    );
    return thisUserSessions;
  });

  // const getRunName = function (runId) {
  //   const run = useSelector((state) => selectRun(state, runId));
  // };

  // const history = useHistory();
  const goToSession = function (session) {
    let goToPath = "";
    switch (session.type) {
      case "work":
        goToPath = `/run/${session.runId}/${session.stage}`;
        break;
      case "assign":
        goToPath = `/run/${session.runId}/${session.stage}/start`;
        break;
      case "flag":
      case "qa":
        goToPath = `/run/${session.runId}/${session.stage}/${session.sessionId}`;
        break;
      default:
        break;
    }

    return goToPath;
  };

  return (
    <>
      <h2>
        Que for <UserName userId={displayUser} />
      </h2>
      <ul className={styles.sessionsList}>
        {userSessions.map((session) => (
          <li key={session.sessionId} className={styles.sessionItem}>
            <SessionCard
              type={
                session.type === "flag"
                  ? getFlagName(session.amount)
                  : session.type
              }
              title={getSessionName(session)}
            >
              <div className={styles.sessionInner}>
                <div>
                  <ModalControl
                    title={t("Session Details")}
                    triggerCopy={""}
                    buttonAttrs={{
                      icon:
                        session.notes && session.notes.length
                          ? "detailsAlt"
                          : "details",
                    }}
                  >
                    <SessionDetails session={session} />
                  </ModalControl>
                  {t("Run ID")}: {session.runId}
                  <br />
                  <br />
                  {session.type === "qa" ? (
                    <CheckCloser
                      thisStage={session.stage}
                      session={session}
                      currentRunId={session.runId}
                    />
                  ) : (
                    <Button path={() => goToSession(session)} icon="start">
                      {session.type === "work" ? "Continue" : "Start"}
                    </Button>
                  )}
                </div>

                <div className={styles.sessionTime}>
                  <Stopwatch>
                    <Timer startTime={session.startTime} />
                  </Stopwatch>
                </div>
              </div>
            </SessionCard>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPanel;
