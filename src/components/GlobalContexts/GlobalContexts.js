import React from "react";
import PropTypes from "prop-types";

import TimeFormatContext from "../../contexts/TimeFormatContext.js";
import DateFormatContext from "../../contexts/DateFormatContext.js";
import UnitSystemContext from "../../contexts/UnitSystemContext.js";
import ViewModeContext from "../../contexts/ViewModeContext.js";
import SiteThemeContext from "../../contexts/SiteThemeContext.js";

/**
 * All global site contexts.
 */

function GlobalContexts(props) {
  return (
    <TimeFormatContext.Provider value={props.timeFormat}>
      <DateFormatContext.Provider value={props.dateFormat}>
        <UnitSystemContext.Provider value={props.unitSystem}>
          <ViewModeContext.Provider value={props.viewMode}>
            <SiteThemeContext.Provider value={props.siteTheme}>
              {props.children}
            </SiteThemeContext.Provider>
          </ViewModeContext.Provider>
        </UnitSystemContext.Provider>
      </DateFormatContext.Provider>
    </TimeFormatContext.Provider>
  );
}

GlobalContexts.propTypes = {
  unitSystem: PropTypes.oneOf(["metric", "us"]).isRequired,
  timeFormat: PropTypes.oneOf(["24h", "12h"]).isRequired,
  dateFormat: PropTypes.oneOf(["ymd", "mdy"]).isRequired,
  siteTheme: PropTypes.oneOf(["dark", "light"]).isRequired,
  viewMode: PropTypes.oneOf(["full", "simple"]).isRequired,
  children: PropTypes.node,
};

export default GlobalContexts;
