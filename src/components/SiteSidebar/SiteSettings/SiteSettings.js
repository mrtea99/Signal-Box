import React from "react";

import FormItem from "../../FormItem/FormItem.js";

import styles from "./SiteSettings.module.css";

function SiteSettings() {
  const [lang, setLang] = React.useState("en-us");
  const [unitSystem, setUnitSystem] = React.useState("metric");
  const [timeFormat, setTimeFormat] = React.useState("24h");
  const [siteTheme, setSiteTheme] = React.useState("dark");
  const [viewMode, setViewMode] = React.useState("full");

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
          updateHandler={setLang}
        />
        {/* Units */}
        <FormItem
          type="toggleButton"
          label="Units:"
          ident="site-unit-system"
          itemLabels={["Metric", "U.S. Customary"]}
          itemValues={["metric", "us"]}
          value={unitSystem}
          updateHandler={setUnitSystem}
        />
        {/* Time Format */}
        <FormItem
          type="toggleButton"
          label="Time Format:"
          ident="site-time-format"
          itemLabels={["24h", "12h"]}
          itemValues={["24h", "12h"]}
          value={timeFormat}
          updateHandler={setTimeFormat}
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
        {/* Simple mode */}
        <FormItem
          type="toggleButton"
          label="View Mode:"
          ident="site-view-mode"
          itemLabels={["Full", "Simple"]}
          itemValues={["full", "simple"]}
          value={viewMode}
          updateHandler={setViewMode}
        />
      </form>
    </div>
  );
}

export default SiteSettings;
