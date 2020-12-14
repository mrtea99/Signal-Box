import React from "react";

import TimeFormatContext from "../../contexts/TimeFormatContext.js";
import DateFormatContext from "../../contexts/DateFormatContext.js";
import UnitSystemContext from "../../contexts/UnitSystemContext.js";
import ViewModeContext from "../../contexts/ViewModeContext.js";
import SiteThemeContext from "../../contexts/SiteThemeContext.js";

function GlobalContexts(props) {
  return (
    <TimeFormatContext.Provider value={props.timeFormat}>
      <DateFormatContext.Provider value={props.dateFormat}>
        <UnitSystemContext.Provider value={props.unitSystem}>
          <ViewModeContext.Provider value={props.viewMode}>
            <SiteThemeContext.Provider value={props.viewMode}>
              {props.children}
            </SiteThemeContext.Provider>
          </ViewModeContext.Provider>
        </UnitSystemContext.Provider>
      </DateFormatContext.Provider>
    </TimeFormatContext.Provider>
  );
}

export default GlobalContexts;
