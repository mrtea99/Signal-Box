import React from "react";

import FormItem from "../../FormItem/FormItem.js";

import styles from "./SiteSettings.module.css";

import i18n from "../../../i18n.js";
import { withTranslation } from "react-i18next";

function SiteSettings(props) {
  const savedLanguage = () =>
    window.localStorage.getItem("language") || "en-us";
  const [lang, setLang] = React.useState(savedLanguage);
  const changeLang = function (newLang) {
    setLang(newLang);
    window.localStorage.setItem("language", newLang);
    i18n.changeLanguage(newLang);
  };

  const [siteTheme, setSiteTheme] = React.useState("dark");
  // const [viewMode, setViewMode] = React.useState("full");

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Site Settings:</h3>
      <form>
        {/* Language */}
        <FormItem
          type="toggleButton"
          label="Language:"
          ident="site-lang"
          itemLabels={["🏴󠁧󠁢󠁥󠁮󠁧󠁿 English", "🇪🇸 Español"]}
          itemValues={["en-us", "es-mx"]}
          value={lang}
          updateHandler={changeLang}
        />
        {/* Units */}
        <FormItem
          type="toggleButton"
          label="Units:"
          ident="site-unit-system"
          itemLabels={["Metric", "U.S. Customary"]}
          itemValues={["metric", "us"]}
          value={props.unitSystem}
          updateHandler={props.setUnitSystem}
        />
        {/* Time Format */}
        <FormItem
          type="toggleButton"
          label="Time Format:"
          ident="site-time-format"
          itemLabels={["24h", "12h"]}
          itemValues={["24h", "12h"]}
          value={props.timeFormat}
          updateHandler={props.setTimeFormat}
        />
        {/* Date Format */}
        <FormItem
          type="toggleButton"
          label="Date Format:"
          ident="site-date-format"
          itemLabels={["YYYY-MM-DD", "MM/DD/YY"]}
          itemValues={["ymd", "mdy"]}
          value={props.dateFormat}
          updateHandler={props.setDateFormat}
        />
        {/* Theme */}
        <FormItem
          type="toggleButton"
          label="Theme:"
          ident="site-theme"
          itemLabels={["Dark", "Light"]}
          itemValues={["dark", "light"]}
          value={siteTheme}
          updateHandler={setSiteTheme}
        />
        {/* View mode */}
        <FormItem
          type="toggleButton"
          label="View Mode:"
          ident="site-view-mode"
          itemLabels={["Full", "Simple"]}
          itemValues={["full", "simple"]}
          value={props.viewMode}
          updateHandler={props.setViewMode}
        />
      </form>
    </div>
  );
}

export default withTranslation()(SiteSettings);
