import React from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem.js";

import UnitSystemContext from "../../../contexts/DateFormatContext.js";

function WeightField(props) {
  const unitSystem = React.useContext(UnitSystemContext);

  const updateConverter = function (metricValue) {
    const usValue = convertValue(metricValue, "metric");
    props.updateHandler(usValue);
  };

  const roundValue = function (value) {
    const roundedValue = value; //Math.round((value + Number.EPSILON) * 100) / 100
    return roundedValue;
  };

  const convertValue = function (value, sourceSystem) {
    const gramOunceRatio = 0.035274;

    let convertedValue;
    if (sourceSystem === "metric") {
      convertedValue = roundValue(value * gramOunceRatio);
    } else {
      convertedValue = roundValue(value / gramOunceRatio);
    }
    return convertedValue;
  };

  return (
    <>
      {unitSystem === "metric" ? (
        <FormItem
          key={props.ident + "g"}
          type="number"
          ident={props.ident}
          label={`${props.label} (g):`}
          updateHandler={updateConverter}
          min="0"
          value={convertValue(props.value, "us")}
        />
      ) : (
        <FormItem
          key={props.ident + "oz"}
          type="number"
          ident={props.ident}
          label={`${props.label} (ozm):`}
          updateHandler={props.updateHandler}
          min="0"
          value={props.value}
        />
      )}
    </>
  );
}

WeightField.propTypes = {
  updateHandler: PropTypes.func.isRequired,
  ident: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default WeightField;
