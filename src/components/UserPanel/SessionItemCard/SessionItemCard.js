import React from "react";
import { useSelector } from "react-redux";

import Button from "../../Button/Button";
import CheckCloser from "../../CheckCloser/CheckCloser";
import ModalControl from "../../Modal/ModalControl/ModalControl";
import SessionCard from "../../RunEditor/Stage/SessionCard/SessionCard";
import Stopwatch from "../../RunEditor/Stage/SessionDuring/Stopwatch/Stopwatch";
import SessionDetails from "../../SessionList/SessionDetails/SessionDetails";
import Timer from "../../Timer/Timer";

import getFlagName from "../../../utils/getFlagName.js";
import getSessionName from "../../../utils/getSessionName.js";

import styles from "./SessionItemCard.module.css";

import { selectRun } from "../../RunList/runsSlice.js";

import { useTranslation } from "react-i18next";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer";

function SessionItemCard({ session }) {
  const { t } = useTranslation();

  const run = useSelector((state) => selectRun(state, session.runId));
  const runName = run.productName;

  const goToSession = function (session) {
    let goToPath = "";
    switch (session.type) {
      case "work":
      case "qa":
        goToPath = `/run/${session.runId}/${session.stage}`;
        break;
      case "assign":
        goToPath = `/run/${session.runId}/${session.stage}/start`;
        break;
      default:
        break;
    }

    return goToPath;
  };

  return (
    <SessionCard
      type={
        session.type === "flag" ? getFlagName(session.amount) : session.type
      }
      title={getSessionName(session)}
    >
      <div className={styles.sessionInner}>
        <div>
          <header className={styles.sessionInfo}>
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
            <div className={styles.runTitle}>
              <h3 className={styles.runName}>{runName}</h3>
              <h4 className={styles.runId}>
                {t("Run ID")}: {session.runId}
              </h4>
            </div>
          </header>
          {session.type === "qa" ? (
            <ButtonSpacer>
              <Button path={() => goToSession(session)}>{"View Stage"}</Button>
              <CheckCloser
                thisStage={session.stage}
                session={session}
                currentRunId={session.runId}
              />
            </ButtonSpacer>
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
  );
}

export default SessionItemCard;
