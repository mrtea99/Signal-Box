import React from "react";

import TimeFormatContext from "../../contexts/TimeFormatContext.js";
import DateFormatContext from "../../contexts/DateFormatContext.js";
import UnitSystemContext from "../../contexts/DateFormatContext.js";

function GlobalContexts(props) {
  return (
    <TimeFormatContext.Provider value={props.timeFormat}>
      <DateFormatContext.Provider value={props.dateFormat}>
        <UnitSystemContext.Provider value={props.unitSystem}>
          {props.children}
        </UnitSystemContext.Provider>
      </DateFormatContext.Provider>
    </TimeFormatContext.Provider>
  );
}

export default GlobalContexts;
