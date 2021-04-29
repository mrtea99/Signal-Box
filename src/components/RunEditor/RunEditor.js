import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import Stage from "./Stage/Stage.js";
import StageNav from "../StageNav/StageNav.js";
import Button from "../Button/Button.js";
// import TableHeader from "../TableHeader/TableHeader.js";
import RunTitle from "../RunList/RunTitle/RunTitle.js";

import styles from "./RunEditor.module.css";

import { selectRun } from "../RunList/runsSlice.js";

// import stageNames from "../../data/stageNames.json";

import ViewModeContext from "../../contexts/ViewModeContext.js";
import SiteThemeContext from "../../contexts/SiteThemeContext.js";

import { useTranslation } from "react-i18next";

/**
 * Displays the main run editor view
 */

function RunEditor() {
  const { t } = useTranslation();

  const siteTheme = useContext(SiteThemeContext);
  const lightTheme = siteTheme === "light";

  // Router
  //----------------------
  let { runId, stageNum } = useParams();
  let history = useHistory();

  runId = parseInt(runId);
  const thisRunData = useSelector((state) => selectRun(state, runId));

  const handleExitClick = function () {
    const backLoc = window.localStorage.getItem("editorBackLoc") || "/";
    history.push(backLoc);
  };

  const changeStage = function (runId, newIndex) {
    history.push(`/run/${runId}/${newIndex}`);
  };

  // If no stage is in path then default to 0
  if (stageNum === undefined) {
    stageNum = 0;
    changeStage(runId, stageNum);
  } else {
    stageNum = parseInt(stageNum);
  }

  // View Mode
  //----------------------
  const viewMode = useContext(ViewModeContext);
  const simpleMode = viewMode === "simple";

  // Render
  //----------------------
  return (
    <>
      {thisRunData ? (
        <div
          className={`${styles.runEditor} ${styles.runEditorActive} ${
            lightTheme ? styles.runEditorLight : null
          }`}
        >
          <div className={styles.inner}>
            <header className={styles.controlBar}>
              <Button onClick={() => handleExitClick()} icon="cross" iconFirst>
                {t("Exit Run")}
              </Button>
            </header>
            <div className={styles.contentPane}>
              <RunTitle currentRunId={thisRunData.id} />

              {/* <TableHeader
                items={stageNames.map((stageName) => ({
                  copy: stageName,
                }))}
              /> */}

              <StageNav
                currentRunId={runId}
                activeStage={stageNum}
                buttonCallback={(newIndex) => changeStage(runId, newIndex)}
                stageLabels
                showActive
                hideStatus={simpleMode}
              />

              <Stage
                key={runId + stageNum}
                currentRunId={runId}
                thisStage={stageNum}
              />
            </div>
            {/* <pre>{JSON.stringify(thisRunData)}</pre> */}
          </div>
        </div>
      ) : (
        <div className={`${styles.runEditor} ${styles.runEditorActive}`}>
          <p>
            {t("Run not found")}
            <br /> <Link to="/">{t("Home")}</Link>
          </p>
        </div>
      )}
    </>
  );
}

export default RunEditor;
