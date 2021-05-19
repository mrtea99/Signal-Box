import React from "react";
import { useSelector } from "react-redux";

import Button from "../../Button/Button";
import CheckCloser from "../../CheckCloser/CheckCloser";
import ModalControl from "../../Modal/ModalControl/ModalControl";
import SessionCard from "../../RunEditor/Stage/SessionCard/SessionCard";
import SessionDetails from "../../SessionList/SessionDetails/SessionDetails";
import FlagCloser from "../../FlagCloser/FlagCloser";

import getFlagName from "../../../utils/getFlagName.js";
import getSessionName from "../../../utils/getSessionName.js";

import styles from "./SessionItemCard.module.css";

import { selectRun } from "../../RunList/runsSlice.js";

import { useTranslation } from "react-i18next";

function SessionItemCard({ session }) {
  const { t } = useTranslation();

  const run = useSelector((state) => selectRun(state, session.runId));
  const runName = run.productName;

  const goToSession = function (session) {
    let goToPath = "";
    switch (session.type) {
      case "assign":
        goToPath = `/run/${session.runId}/${session.stage}/start`;
        break;
      default:
        goToPath = `/run/${session.runId}/${session.stage}`;
        break;
    }

    return goToPath;
  };

  // const prettyTime = function (time) {
  //   const dayNames = [
  //     t("Sunday"),
  //     t("Monday"),
  //     t("Tuesday"),
  //     t("Wednesday"),
  //     t("Thursday"),
  //     t("Friday"),
  //     t("Saturday"),
  //   ];

  //   const dayNumber = new Date(time).getDay();
  //   const shiftName = getShiftName(time) || "";

  //   return `${dayNames[dayNumber]}${shiftName.length ? " " + shiftName : ""}`;
  // };

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
                color: "cancel",
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
        </div>
        <div>
          {session.endTime === null ? (
            <>
              {session.type === "qa" ? (
                <CheckCloser
                  thisStage={session.stage}
                  session={session}
                  currentRunId={session.runId}
                />
              ) : null}

              {session.type === "flag" ? (
                <FlagCloser
                  thisStage={session.stage}
                  session={session}
                  currentRunId={session.runId}
                />
              ) : null}
              {session.type === "work" || session.type === "assign" ? (
                <Button
                  path={() => goToSession(session)}
                  icon="start"
                  onClick={() =>
                    window.localStorage.setItem(
                      "editorBackLoc",
                      window.location.pathname
                    )
                  }
                >
                  {/* {session.type === "work" ? "Continue" : "Start"} */}
                </Button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </SessionCard>
  );
}

export default SessionItemCard;
