import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import TemperatureField from "../FormItem/TemperatureField/TemperatureField";
import FormItem from "../FormItem/FormItem";
import FormLayout from "../FormItem/FormLayout/FormLayout";

import styles from "./AtmosBatcher.module.css";

import { useTranslation } from "react-i18next";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer";

/**
 * Alows the creation of several atmos entries for a session,
 * which are batched up ready to be saved all together.
 */

function AtmosBatcher(props) {
  const { t } = useTranslation();

  const locations = ["Front room", "Kitchen", "Back room"];

  // Set the index of the default location based on the current stage
  let defaultLocation;
  switch (props.thisStage) {
    case 2:
      defaultLocation = 1;
      break;
    case 3:
      defaultLocation = 2;
      break;
    default:
      defaultLocation = 0;
  }

  const addItem = function () {
    const newAtmosData = [...props.atmosData];

    const atmosItem = {
      id: Date.now(),
      temperature: 75,
      humidity: 50,
      location: locations[defaultLocation],
      notes: "",
      primary: false,
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

  const deleteItem = function (itemId) {
    let newAtmosData = props.atmosData.filter((atmosItem) => {
      return atmosItem.id !== itemId;
    });

    // Set the first item in the array to be the primary reading
    newAtmosData.forEach((atmosItem) => (atmosItem.primary = false));
    if (newAtmosData.length) {
      newAtmosData[0].primary = true;
    }

    props.setAtmosData(newAtmosData);
  };

  return (
    <>
      <ul className={styles.readingList}>
        {props.atmosData.map((atmosItem, index) => (
          <li key={"atmos-item-" + atmosItem.id} className={styles.reading}>
            <header className={styles.readingHeader}>
              <h3 className={styles.readingTitle}>
                {index === 0
                  ? t("Primary Climate Reading")
                  : t("Additional Climate Reading") +
                    (props.atmosData.length > 2 ? " " + index : "")}
              </h3>
              <Button
                color="delete"
                onClick={() => deleteItem(atmosItem.id)}
                icon="cross"
              />
            </header>
            <FormLayout>
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
                ident={"sess-atmos-loc-stage-" + props.thisStage + index}
                type="select"
                label={`${t("Location")}:`}
                value={atmosItem.location}
                updateHandler={(value) =>
                  updateItem(atmosItem.id, "location", value)
                }
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {t(location)}
                  </option>
                ))}
              </FormItem>
              <FormItem
                ident={"sess-atmos-note-stage-" + props.thisStage + index}
                type="textarea"
                label={`${t("Note")}:`}
                updateHandler={(value) =>
                  updateItem(atmosItem.id, "notes", value)
                }
                value={atmosItem.notes}
              />{" "}
            </FormLayout>
          </li>
        ))}
      </ul>
      <ButtonSpacer align="right">
        <Button onClick={addItem} icon="plus">
          {t("Add Climate Reading")}
        </Button>
      </ButtonSpacer>
    </>
  );
}

AtmosBatcher.propTypes = {
  atmosData: PropTypes.array.isRequired,
  setAtmosData: PropTypes.func.isRequired,
  thisStage: PropTypes.number,
};

export default AtmosBatcher;
