import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SiteSidebar from "./components/SiteSidebar/SiteSidebar.js";
import RunList from "./components/RunList/RunList.js";
import RunEditor from "./components/RunEditor/RunEditor.js";
import RunInfo from "./components/RunInfo/RunInfo.js";
// import Button from "./components/Button/Button.js";
import TabBox from "./components/TabBox/TabBox.js";
import SiteHeader from "./components/SiteHeader/SiteHeader.js";
import SiteSettings from "./components/SiteSidebar/SiteSettings/SiteSettings.js";
import GlobalContexts from "./components/GlobalContexts/GlobalContexts.js";
import RunFilter from "./components/RunFilter/RunFilter.js";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.js";

import stageNames from "./data/stageNames.json";

// import { useTranslation } from "react-i18next";

import styles from "./App.module.css";

// import {users}

function App() {
  // i18n
  //==============================================================================
  // const { t } = useTranslation();

  // Redux
  //==============================================================================
  const dispatch = useDispatch();

  // Loading Screen
  //==============================================================================
  const disableLoadingScreen = true;

  const [loading, setLoading] = React.useState(!disableLoadingScreen);

  //temp fake loading time
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  });

  // Backend onload data
  //==============================================================================
  // Data for all runs - needs to replaced with API call
  const savedRunData = () =>
    JSON.parse(window.localStorage.getItem("runData")) || [];
  const [runData, setRunData] = React.useState(savedRunData);
  React.useEffect(() => {
    window.localStorage.setItem("runData", JSON.stringify(runData));
  }, [runData]);

  // const savedSessionData = () =>
  //   JSON.parse(window.localStorage.getItem("sessionData")) || [];
  // const [sessionData, setSessionData] = React.useState(savedSessionData);
  // React.useEffect(() => {
  //   window.localStorage.setItem("sessionData", JSON.stringify(sessionData));
  // }, [sessionData]);

  // Frontend onload data
  //==============================================================================
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

  // React.useEffect(() => {
  //   dispatch({
  //     type: "users/setCurrentUser",
  //     payload: window.localStorage.getItem("activeUser") || 1,
  //   });
  // }, [dispatch]);
  const activeUser = useSelector((state) => state.users.currentUser);
  React.useEffect(() => {
    window.localStorage.setItem("activeUser", activeUser);
  }, [activeUser]);

  // Site settings
  //-------------------------------------
  const defaultSiteSettings = {
    timeFormat: "24h",
    dateFormat: "ymd",
    unitSystem: "metric",
    siteTheme: "dark",
    viewMode: "full",
  };

  const savedTimeFormat = () =>
    window.localStorage.getItem("timeFormat") ||
    defaultSiteSettings["timeFormat"];
  const [timeFormat, setTimeFormat] = React.useState(savedTimeFormat);
  React.useEffect(() => {
    window.localStorage.setItem("timeFormat", timeFormat);
  }, [timeFormat]);

  const savedDateFormat = () =>
    window.localStorage.getItem("dateFormat") ||
    defaultSiteSettings["dateFormat"];
  const [dateFormat, setDateFormat] = React.useState(savedDateFormat);
  React.useEffect(() => {
    window.localStorage.setItem("dateFormat", dateFormat);
  }, [dateFormat]);

  const savedUnitSystem = () =>
    window.localStorage.getItem("unitSystem") ||
    defaultSiteSettings["unitSystem"];
  const [unitSystem, setUnitSystem] = React.useState(savedUnitSystem);
  React.useEffect(() => {
    window.localStorage.setItem("unitSystem", unitSystem);
  }, [unitSystem]);

  const savedSiteTheme = () =>
    window.localStorage.getItem("siteTheme") ||
    defaultSiteSettings["siteTheme"];
  const [siteTheme, setSiteTheme] = React.useState(savedSiteTheme);
  React.useEffect(() => {
    window.localStorage.setItem("siteTheme", siteTheme);
  }, [siteTheme]);

  const savedViewMode = () =>
    window.localStorage.getItem("viewMode") || defaultSiteSettings["viewMode"];
  const [viewMode, setViewMode] = React.useState(savedViewMode);
  React.useEffect(() => {
    window.localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // Filters
  //-------------------------------------
  const defaultRunFilters = {
    showUser: [],
    showUnresolvedQa: false,
  };

  const savedRunFilters = () =>
    JSON.parse(window.localStorage.getItem("runFilters")) || defaultRunFilters;
  const [runFilters, setRunFilters] = React.useState(savedRunFilters);
  React.useEffect(() => {
    window.localStorage.setItem("runFilters", JSON.stringify(runFilters));
  }, [runFilters]);

  // UI state
  //==============================================================================
  const [sidebarActive, setSidebarActive] = React.useState(false);
  const [modalNewActive, setModalNewActive] = React.useState(false);

  // Run creation and editing functions
  //==============================================================================
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
  //==============================================================================
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
            <SiteHeader setSidebarActive={setSidebarActive} />
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
                      />
                    </section>
                    <section className={styles.otherControls}>
                      {/* <Button
                        onClick={() => setModalNewActive(true)}
                        icon="plus"
                      >
                        {t("New Run")}
                      </Button> */}
                      <RunInfo
                        active={modalNewActive}
                        setActive={setModalNewActive}
                        createRun={createRun}
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
