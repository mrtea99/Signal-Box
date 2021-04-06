import React, { useContext } from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem.js";

import UnitSystemContext from "../../../contexts/UnitSystemContext.js";

function TemperatureField(props) {
  const unitSystem = useContext(UnitSystemContext);

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

  return (
    <>
      {unitSystem === "metric" ? (
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
      ) : (
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
      )}
    </>
  );
}

TemperatureField.propTypes = {
  updateHandler: PropTypes.func.isRequired,
  ident: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default TemperatureField;
