import React from "react";

import Button from "../../../Button/Button.js";
import ButtonSpacer from "../../../Button/ButtonSpacer/ButtonSpacer.js";
import FormItem from "../../../FormItem/FormItem.js";
import TemperatureField from "../../../FormItem/TemperatureField/TemperatureField.js";

const activityList = [
  [
    { name: "Material Check", fields: [] },
    {
      name: "Create Blend / Base",
      fields: ["atmos", "amounts", "weight", "qa"],
    },
    { name: "Misc", fields: [] },
    { name: "Assisting", fields: [] },
  ],
  [
    { name: "Materials / Equip Prep", fields: [] },
    { name: "Manufacturing", fields: ["atmos", "amounts", "weight", "qa"] },
    { name: "Create Blend / Base", fields: [] },
    { name: "Cooling", fields: ["atmos"] },
    { name: "Curing", fields: ["atmos"] },
    { name: "Finishing Touches", fields: [] },
    { name: "Assisting", fields: [] },
  ],
  [
    { name: "Packaging Prep", fields: [] },
    { name: "Packaging", fields: ["atmos", "amounts", "weight", "qa"] },
    { name: "Pouring", fields: ["atmos", "amounts", "weight", "qa"] },
    { name: "Cooling", fields: ["atmos"] },
    { name: "Finishing Touches", fields: [] },
    { name: "Assisting", fields: [] },
  ],
  [
    { name: "Labeling", fields: ["atmos", "amounts", "qa"] },
    { name: "Sealing", fields: ["atmos", "amounts", "qa"] },
    { name: "Boxing", fields: ["atmos", "amounts", "qa"] },
    { name: "Assisting", fields: [] },
  ],
  [
    { name: "Update Inventory", fields: [] },
    { name: "Stock Wicker Park", fields: [] },
    { name: "Stock Warehouse", fields: [] },
    { name: "Misc", fields: [] },
  ],
];

function SessionStartForm(props) {
  // Activity type (all)
  const [activityData, setActivityData] = React.useState(
    activityList[props.thisStage][0]
  );
  // Room temp (manu and cool)
  const [temperature, setTemperature] = React.useState(70);
  // Room humidity (manu and cool)
  const [humidity, setHumidity] = React.useState(50);

  const handleNewClick = function (e) {
    e.preventDefault();

    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      type: "work",
      resolved: false,
      startTime: Date.now(),
      activity: activityData,
      user: props.activeUser,
    };

    if (props.thisStage === 1) {
      newSession.temperature = temperature;
      newSession.humidity = humidity;
    }

    props.addSession(newSession, newSessionUid, props.thisStage);

    props.setFormActive(false);
  };

  const validateForm = function () {
    if (activityData.fields && activityData.fields.includes("atmos")) {
      if (
        typeof temperature === "number" &&
        temperature >= 32 &&
        temperature <= 120 &&
        typeof humidity === "number" &&
        humidity >= 0 &&
        humidity <= 100
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  return (
    <form>
      <FormItem
        type="select"
        ident={"sess-activity-stage-" + props.thisStage}
        label="Activity:"
        updateHandler={(value) =>
          setActivityData(activityList[props.thisStage][value])
        }
        value={activityList[props.thisStage].indexOf(activityData)}
      >
        {activityList[props.thisStage].map((activityType, index) => (
          <option
            key={"activity-" + index + "-stage-" + props.thisStage}
            value={index}
          >
            {activityType.name}
          </option>
        ))}
      </FormItem>
      {activityData.fields && activityData.fields.includes("atmos") ? (
        <>
          <TemperatureField
            ident={"sess-temp-stage-" + props.thisStage}
            label={"Room Temperature"}
            updateHandler={(value) => setTemperature(value)}
            value={temperature}
          />
          <FormItem
            type="number"
            ident={"sess-humidity-stage-" + props.thisStage}
            label="Room Humidity (%):"
            updateHandler={(value) => setHumidity(value)}
            min="0"
            max="100"
            value={humidity}
          />
        </>
      ) : null}
      <ButtonSpacer align="right">
        <Button onClick={() => props.setFormActive(false)} color="cancel">
          Cancel
        </Button>
        <Button
          onClick={handleNewClick}
          disabled={!validateForm()}
          icon="start"
        >
          Start New Session
        </Button>
      </ButtonSpacer>
    </form>
  );
}

export default SessionStartForm;
