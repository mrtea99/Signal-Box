import React from "react";
import "./App.css";

import styles from "./App.module.css";

import SiteSidebar from "./components/SiteSidebar/SiteSidebar.js";
import RunList from "./components/RunList/RunList.js";
import RunEditor from "./components/RunEditor/RunEditor.js";
import RunInfoNew from "./components/RunInfo/RunInfo.js";
import Button from "./components/Button/Button.js";
import TabBox from "./components/TabBox/TabBox.js";
import SiteHeader from "./components/SiteHeader/SiteHeader.js";
import SiteSettings from "./components/SiteSidebar/SiteSettings/SiteSettings.js";
import GlobalContexts from "./components/GlobalContexts/GlobalContexts.js";
import RunFilter from "./components/RunFilter/RunFilter.js";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.js";

import stageNames from "./data/stageNames.json";

import { useTranslation } from "react-i18next";

function App() {
  // i18n
  //-----------------------------------------------------------
  const { t } = useTranslation();

  // Loading Screen
  //-----------------------------------------------------------
  const [loading, setLoading] = React.useState(false);

  //temp fake loading time
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  });

  // Backend onload data
  //-----------------------------------------------------------
  // Data for all runs - needs to replaced with API call
  const savedRunData = () =>
    JSON.parse(window.localStorage.getItem("runData")) || [];
  const [runData, setRunData] = React.useState(savedRunData);
  React.useEffect(() => {
    window.localStorage.setItem("runData", JSON.stringify(runData));
  }, [runData]);

  // Frontend onload data
  //-----------------------------------------------------------
  const savedCurrentRunUid = () =>
    parseInt(window.localStorage.getItem("currentRunUid"), 10) || null;
  const [currentRunUid, setCurrentRunUid] = React.useState(savedCurrentRunUid);
  React.useEffect(() => {
    window.localStorage.setItem("currentRunUid", currentRunUid);
  }, [currentRunUid]);

  const savedActiveStage = () =>
    parseInt(window.localStorage.getItem("activeStage"), 10) || 0;
  const [activeStage, setActiveStage] = React.useState(savedActiveStage);
  React.useEffect(() => {
    window.localStorage.setItem("activeStage", activeStage);
  }, [activeStage]);

  const savedActiveUser = () =>
    window.localStorage.getItem("activeUser") || "1";
  const [activeUser, setActiveUser] = React.useState(savedActiveUser);
  React.useEffect(() => {
    window.localStorage.setItem("activeUser", activeUser);
  }, [activeUser]);

  // Site settings
  //=====================================
  const savedTimeFormat = () =>
    window.localStorage.getItem("timeFormat") || "24h";
  const [timeFormat, setTimeFormat] = React.useState(savedTimeFormat);
  React.useEffect(() => {
    window.localStorage.setItem("timeFormat", timeFormat);
  }, [timeFormat]);

  const savedDateFormat = () =>
    window.localStorage.getItem("dateFormat") || "ymd";
  const [dateFormat, setDateFormat] = React.useState(savedDateFormat);
  React.useEffect(() => {
    window.localStorage.setItem("dateFormat", dateFormat);
  }, [dateFormat]);

  const savedUnitSystem = () =>
    window.localStorage.getItem("unitSystem") || "metric";
  const [unitSystem, setUnitSystem] = React.useState(savedUnitSystem);
  React.useEffect(() => {
    window.localStorage.setItem("unitSystem", unitSystem);
  }, [unitSystem]);

  const savesSiteTheme = () =>
    window.localStorage.getItem("siteTheme") || "dark";
  const [siteTheme, setSiteTheme] = React.useState(savesSiteTheme);
  React.useEffect(() => {
    window.localStorage.setItem("siteTheme", siteTheme);
  }, [siteTheme]);

  const savedViewMode = () => window.localStorage.getItem("viewMode") || "full";
  const [viewMode, setViewMode] = React.useState(savedViewMode);
  React.useEffect(() => {
    window.localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // UI state
  //-----------------------------------------------------------
  const [sidebarActive, setSidebarActive] = React.useState(false);
  const [modalNewActive, setModalNewActive] = React.useState(false);

  // Filters state
  //-----------------------------------------------------------
  const defaultRunFilters = {
    showUser: [],
    showUnresolvedQa: false,
  };

  const savedRunFilters = () =>
    JSON.parse(window.localStorage.getItem("runFilters") || defaultRunFilters);
  const [runFilters, setRunFilters] = React.useState(savedRunFilters);
  React.useEffect(() => {
    window.localStorage.setItem("runFilters", JSON.stringify(runFilters));
  }, [runFilters]);

  // Run creation and editing functions
  //-----------------------------------------------------------
  const createRun = function (newRunData) {
    let newData = [...runData];
    newData.push(newRunData);
    setRunData(newData);
  };

  const updateRunData = function (uid, dataSection, dataKey, newValue) {
    if (dataSection === "delete") {
      deleteRun(uid);
    } else {
      const updatedRunData = runData.map((run) => {
        if (run.id === uid) {
          //A new object should be created and returned here, but this is working for the time being
          if (dataSection !== null) {
            run[dataSection][dataKey] = newValue;
          } else {
            run[dataKey] = newValue;
          }
          return run;
        }
        return run;
      });
      setRunData(updatedRunData);
    }
  };

  const deleteRun = function (uid) {
    const updatedRunData = runData.filter((run) => uid !== run.id);
    setRunData(updatedRunData);
  };

  // Render
  //-----------------------------------------------------------
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <GlobalContexts
          timeFormat={timeFormat}
          dateFormat={dateFormat}
          unitSystem={unitSystem}
          siteTheme={siteTheme}
          viewMode={viewMode}
        >
          <div
            className={`${styles.siteContainer} ${
              siteTheme === "light" ? styles.siteContainerLight : null
            }`}
          >
            <SiteHeader
              activeUser={activeUser}
              setActiveUser={setActiveUser}
              setSidebarActive={setSidebarActive}
            />
            <div className={styles.sitePage}>
              <SiteSidebar
                sidebarActive={sidebarActive}
                setSidebarActive={setSidebarActive}
              >
                <SiteSettings
                  timeFormat={timeFormat}
                  setTimeFormat={setTimeFormat}
                  dateFormat={dateFormat}
                  setDateFormat={setDateFormat}
                  unitSystem={unitSystem}
                  setUnitSystem={setUnitSystem}
                  siteTheme={siteTheme}
                  setSiteTheme={setSiteTheme}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              </SiteSidebar>
              <main className={styles.siteContent}>
                <section>
                  <menu className={styles.listControls}>
                    <section className={styles.filterControls}>
                      <RunFilter
                        runData={runData}
                        runFilters={runFilters}
                        setRunFilters={setRunFilters}
                        activeUser={activeUser}
                      />
                    </section>
                    <section className={styles.otherControls}>
                      <Button
                        onClick={() => setModalNewActive(true)}
                        icon="plus"
                      >
                        {t("New Run")}
                      </Button>
                      <RunInfoNew
                        active={modalNewActive}
                        setActive={setModalNewActive}
                        createRun={createRun}
                        activeUser={activeUser}
                      />
                    </section>
                  </menu>
                  <TabBox
                    boxes={["All", ...stageNames].map((stage, index) => ({
                      label: stage,
                      content: (
                        <RunList
                          key={stage}
                          runData={runData}
                          setCurrentRunUid={setCurrentRunUid}
                          setActiveStage={setActiveStage}
                          activeUser={activeUser}
                          stageNum={index === 0 ? "all" : index - 1}
                          filters={runFilters}
                        />
                      ),
                    }))}
                  />
                </section>
                <section>
                  <RunEditor
                    runData={runData}
                    currentRunUid={currentRunUid}
                    setCurrentRunUid={setCurrentRunUid}
                    activeStage={activeStage}
                    setActiveStage={setActiveStage}
                    updateRunData={updateRunData}
                    activeUser={activeUser}
                    setActiveUser={setActiveUser}
                  />
                </section>
              </main>
            </div>
          </div>
        </GlobalContexts>
      )}
    </>
  );
}

export default App;
