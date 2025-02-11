import React, { useEffect, useState } from "react";
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
import AdminPanel from "./components/AdminPanel/AdminPanel.js";
import UserPanel from "./components/UserPanel/UserPanel.js";
import Button from "./components/Button/Button.js";

import { selectAllRuns } from "./components/RunList/runsSlice.js";
import { selectAllSessions } from "./components/SessionList/sessionsSlice.js";
import { selectCurrentUser } from "./components/UserSwitcher/usersSlice.js";

import styles from "./App.module.css";

function App() {
  // Loading Screen
  //==============================================================================
  const disableLoadingScreen = true;

  const [loading, setLoading] = useState(!disableLoadingScreen);

  //temp fake loading time
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  });

  // Backend onload data
  //==============================================================================
  // Data for all runs - needs to replaced with API call
  const runsData = useSelector(selectAllRuns);
  useEffect(() => {
    window.localStorage.setItem("runsData", JSON.stringify(runsData));
  }, [runsData]);

  // Data for all sessions - needs to replaced with API call
  const sessionsData = useSelector(selectAllSessions);
  useEffect(() => {
    window.localStorage.setItem("sessionsData", JSON.stringify(sessionsData));
  }, [sessionsData]);

  // Data for all runs - needs to replaced with API call
  const atmosData = useSelector((state) => state.atmos.atmosList);
  useEffect(() => {
    window.localStorage.setItem("atmosData", JSON.stringify(atmosData));
  }, [atmosData]);

  // Frontend onload data
  //==============================================================================
  const activeUser = useSelector(selectCurrentUser);
  useEffect(() => {
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
  const [timeFormat, setTimeFormat] = useState(savedTimeFormat);
  useEffect(() => {
    window.localStorage.setItem("timeFormat", timeFormat);
  }, [timeFormat]);

  const savedDateFormat = () =>
    window.localStorage.getItem("dateFormat") ||
    defaultSiteSettings["dateFormat"];
  const [dateFormat, setDateFormat] = useState(savedDateFormat);
  useEffect(() => {
    window.localStorage.setItem("dateFormat", dateFormat);
  }, [dateFormat]);

  const savedUnitSystem = () =>
    window.localStorage.getItem("unitSystem") ||
    defaultSiteSettings["unitSystem"];
  const [unitSystem, setUnitSystem] = useState(savedUnitSystem);
  useEffect(() => {
    window.localStorage.setItem("unitSystem", unitSystem);
  }, [unitSystem]);

  const savedSiteTheme = () =>
    window.localStorage.getItem("siteTheme") ||
    defaultSiteSettings["siteTheme"];
  const [siteTheme, setSiteTheme] = useState(savedSiteTheme);
  useEffect(() => {
    window.localStorage.setItem("siteTheme", siteTheme);
  }, [siteTheme]);

  const savedViewMode = () =>
    window.localStorage.getItem("viewMode") || defaultSiteSettings["viewMode"];
  const [viewMode, setViewMode] = useState(savedViewMode);
  useEffect(() => {
    window.localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // UI state
  //==============================================================================
  const [sidebarActive, setSidebarActive] = useState(false);

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
                <br />
                <Button fillWidth href="/styleguide/" color="cancel">
                  Styleguide
                </Button>
              </SiteSidebar>
              <main className={styles.siteContent}>
                <Switch>
                  <Route
                    path={[
                      "/run/:runId/:stageNum/:sessionId",
                      "/run/:runId/:stageNum",
                    ]}
                  >
                    <RunEditor />
                  </Route>
                  <Redirect from="/run/:runId" to="/run/:runId/0" />
                  <Route path={["/admin/:stageNum", "/admin"]}>
                    <AdminPanel />
                  </Route>
                  <Route path={["/user/:userId"]}>
                    <UserPanel />
                  </Route>
                  <Redirect from="/user" to={`/user/${activeUser}`} />
                  <Redirect from="/" to={`/admin`} />
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
