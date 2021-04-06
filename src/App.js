import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import SiteSidebar from "./components/SiteSidebar/SiteSidebar.js";
import RunEditor from "./components/RunEditor/RunEditor.js";
import SiteHeader from "./components/SiteHeader/SiteHeader.js";
import SiteSettings from "./components/SiteSidebar/SiteSettings/SiteSettings.js";
import GlobalContexts from "./components/GlobalContexts/GlobalContexts.js";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.js";

import { selectAllRuns } from "./components/RunList/runsSlice.js";

// import { useTranslation } from "react-i18next";

import styles from "./App.module.css";
import AdminPanel from "./components/AdminPanel/AdminPanel.js";

function App() {
  // i18n
  //==============================================================================
  // const { t } = useTranslation();

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
  const runsData = useSelector(selectAllRuns);
  React.useEffect(() => {
    window.localStorage.setItem("runsData", JSON.stringify(runsData));
  }, [runsData]);

  // Data for all sessions - needs to replaced with API call
  const sessionsData = useSelector((state) => state.sessions.sessionsList);
  React.useEffect(() => {
    window.localStorage.setItem("sessionsData", JSON.stringify(sessionsData));
  }, [sessionsData]);

  // Frontend onload data
  //==============================================================================

  // React.useEffect(() => {
  //   dispatch({
  //     type: "users/setCurrentUser",
  //     payload: parseInt(window.localStorage.getItem("activeUser")) || 1,
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

  // UI state
  //==============================================================================
  const [sidebarActive, setSidebarActive] = React.useState(false);

  // Render
  //==============================================================================
  return (
    <Router>
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
                <Switch>
                  <Route path={["/run/:runId/:stageNum", "/run/:runId"]}>
                    <RunEditor />
                  </Route>
                  <Route path={["/admin/:stageNum", "/admin"]}>
                    <AdminPanel />
                  </Route>
                  <Route path="/">
                    <Redirect to={`/admin`} />
                  </Route>
                </Switch>
              </main>
            </div>
          </div>
        </GlobalContexts>
      )}
    </Router>
  );
}

export default App;
