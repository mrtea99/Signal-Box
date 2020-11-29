import React from "react";

import FormItem from "../../FormItem/FormItem.js";

import UnitSystemContext from "../../../contexts/DateFormatContext.js";

function TemperatureField(props) {
  const unitSystem = React.useContext(UnitSystemContext);

  const updateConverter = function (metricValue) {
    const usValue = convertValue(metricValue, "metric");
    props.updateHandler(usValue);
  };

  const convertValue = function (value, sourceSystem) {
    let convertedValue;
    if (sourceSystem === "metric") {
      convertedValue = Math.round((value * 9) / 5 + 32);
    } else {
      convertedValue = Math.round(((value - 32) * 5) / 9);
    }
    return convertedValue;
  };

  let fieldElem;
  if (unitSystem === "metric") {
    fieldElem = (
      <FormItem
        key={props.ident + "C"}
        type="number"
        ident={props.ident}
        label={`${props.label} (°C):`}
        updateHandler={updateConverter}
        min="0"
        max="50"
        value={convertValue(props.value, "us")}
      />
    );
  } else {
    fieldElem = (
      <FormItem
        key={props.ident + "F"}
        type="number"
        ident={props.ident}
        label={`${props.label} (°F):`}
        updateHandler={props.updateHandler}
        min="32"
        max="120"
        value={props.value}
      />
    );
  }

  return <>{fieldElem}</>;
}

export default TemperatureField;
