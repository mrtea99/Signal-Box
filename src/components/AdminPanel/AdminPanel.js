import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import RunList from "../../components/RunList/RunList.js";
import SetRunInfo from "../SetRunInfo/SetRunInfo.js";
import TabBox from "../../components/TabBox/TabBox.js";
import RunFilter from "../../components/RunList/RunFilter/RunFilter.js";

import styles from "./AdminPanel.module.css";

import stageNames from "../../data/stageNames.json";

import { useTranslation } from "react-i18next";

/**
 * View for Admins to see the status of all runs and stages, with filters
 */

function AdminPanel() {
  const { t } = useTranslation();

  // Tab URL
  //-------------------------------------
  const { stageNum } = useParams();

  const activeBox =
    stageNum === undefined || stageNum === "all" ? 0 : parseInt(stageNum) + 1;

  let history = useHistory();
  const changeActiveBox = function (index) {
    const stage = index === 0 ? "all" : index - 1;

    history.push(`/admin/${stage}`);
  };

  // Filters
  //-------------------------------------
  const defaultRunFilters = {
    showUser: [],
    showUnresolvedQa: false,
  };

  const savedRunFilters = () =>
    JSON.parse(window.localStorage.getItem("runFilters")) || defaultRunFilters;
  const [runFilters, setRunFilters] = useState(savedRunFilters);
  useEffect(() => {
    window.localStorage.setItem("runFilters", JSON.stringify(runFilters));
  }, [runFilters]);

  // Render
  //-------------------------------------
  return (
    <>
      <menu className={styles.listControls}>
        <section className={styles.filterControls}>
          <RunFilter runFilters={runFilters} setRunFilters={setRunFilters} />
        </section>
        <section className={styles.otherControls}>
          <SetRunInfo />
        </section>
      </menu>
      <TabBox
        activeBox={activeBox}
        changeActiveBox={changeActiveBox}
        boxes={[t("All"), ...stageNames].map((stage, index) => ({
          label: stage,
          content: (
            <RunList
              key={stage}
              stageNum={index === 0 ? "all" : index - 1}
              filters={runFilters}
            />
          ),
        }))}
      />
    </>
  );
}

export default AdminPanel;
