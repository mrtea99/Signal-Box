import React from "react";

import TimeFormatContext from "../../contexts/TimeFormatContext.js";
import DateFormatContext from "../../contexts/DateFormatContext.js";

function GlobalContexts(props) {
  return (
    <TimeFormatContext.Provider value={props.timeFormat}>
      <DateFormatContext.Provider value={props.dateFormat}>
        {props.children}
      </DateFormatContext.Provider>
    </TimeFormatContext.Provider>
  );
}

export default GlobalContexts;
