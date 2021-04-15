import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import TemperatureField from "../FormItem/TemperatureField/TemperatureField";
import FormItem from "../FormItem/FormItem";

/**
 * Creates new Atmos entries for a session
 */

function AtmosBatcher(props) {
  const addItem = function () {
    const newAtmosData = [...props.atmosData];

    const atmosItem = {
      id: Date.now(),
      temperature: 75,
      humidity: 50,
      location: null,
      notes: "",
    };

    newAtmosData.push(atmosItem);

    props.setAtmosData(newAtmosData);
  };

  const updateItem = function (itemId, field, value) {
    const newAtmosData = [...props.atmosData];
    const newAtmosItem = newAtmosData.find(
      (atmosItem) => atmosItem.id === itemId
    );

    newAtmosItem[field] = value;

    props.setAtmosData(newAtmosData);
  };

  return (
    <>
      <ul>
        {props.atmosData.map((atmosItem, index) => (
          <li key={"atmos-item-" + atmosItem.id}>
            <TemperatureField
              ident={"sess-temp-stage-" + props.thisStage}
              label={"Room Temperature"}
              updateHandler={(value) =>
                updateItem(atmosItem.id, "temperature", value)
              }
              value={atmosItem.temperature}
            />
            <FormItem
              type="number"
              ident={"sess-humidity-stage-" + props.thisStage}
              label="Room Humidity (%):"
              updateHandler={(value) =>
                updateItem(atmosItem.id, "humidity", value)
              }
              min="0"
              max="100"
              value={atmosItem.humidity}
            />
          </li>
        ))}
      </ul>

      <Button onClick={addItem} icon="plus">
        Add
      </Button>
    </>
  );
}

AtmosBatcher.propTypes = {
  atmosData: PropTypes.array.isRequired,
  setAtmosData: PropTypes.func.isRequired,
};

export default AtmosBatcher;
