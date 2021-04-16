import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import TemperatureField from "../FormItem/TemperatureField/TemperatureField";
import FormItem from "../FormItem/FormItem";

import { useTranslation } from "react-i18next";

/**
 * Creates new Atmos entries for a session
 */

function AtmosBatcher(props) {
  const { t } = useTranslation();

  const locations = ["Front room", "Kitchen", "Back room"];

  const addItem = function () {
    const newAtmosData = [...props.atmosData];

    const atmosItem = {
      id: Date.now(),
      temperature: 75,
      humidity: 50,
      location: locations[0],
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
              ident={"sess-temp-stage-" + props.thisStage + index}
              label={`${t("Room Temperature")}:`}
              updateHandler={(value) =>
                updateItem(atmosItem.id, "temperature", value)
              }
              value={atmosItem.temperature}
            />
            <FormItem
              type="number"
              ident={"sess-humidity-stage-" + props.thisStage + index}
              label={`${t("Room Humidity")} (%):`}
              updateHandler={(value) =>
                updateItem(atmosItem.id, "humidity", value)
              }
              min="0"
              max="100"
              value={atmosItem.humidity}
            />
            <FormItem
              ident={"sess-atmos-note-stage-" + props.thisStage + index}
              type="textarea"
              label={`${t("Note")}:`}
              updateHandler={(value) =>
                updateItem(atmosItem.id, "notes", value)
              }
              value={atmosItem.notes}
            />
            <FormItem
              ident={"sess-atmos-loc-stage-" + props.thisStage + index}
              type="select"
              label={`${t("Location")}:`}
              value={atmosItem.location}
              updateHandler={(value) =>
                updateItem(atmosItem.id, "location", value)
              }
            >
              {locations.map((location) => (
                <option key={location} value={t(location)}>
                  {location}
                </option>
              ))}
            </FormItem>
          </li>
        ))}
      </ul>

      <Button onClick={addItem} icon="plus">
        {t("Add")}
      </Button>
    </>
  );
}

AtmosBatcher.propTypes = {
  atmosData: PropTypes.array.isRequired,
  setAtmosData: PropTypes.func.isRequired,
};

export default AtmosBatcher;
