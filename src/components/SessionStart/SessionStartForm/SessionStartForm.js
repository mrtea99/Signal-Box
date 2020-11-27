import React from "react";

import Button from "../../Button/Button.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";
import FormItem from "../../FormItem/FormItem.js";

import UnitSystemContext from "../../../contexts/DateFormatContext.js";

const activityList = [
  ["Material Check", "Create Blend/Base", "Misc", "Assisting"],
  [
    "Materials/Equip Prep",
    "Manufacturing",
    "Create Blend/Base",
    "Cooling",
    "Curing",
    "Finishing Touches",
    "Assisting",
  ],
  [
    "Packaging Prep",
    "Packaging",
    "Pouring",
    "Cooling",
    "Finishing Touches",
    "Assisting",
  ],
  ["Labeling", "Sealing", "Boxing", "Assisting"],
  ["Update Inventory", "Stock Wicker Park", "Stock Warehouse", "Misc"],
];

function SessionStartForm(props) {
  const unitSystem = React.useContext(UnitSystemContext);

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
    if (props.thisStage === 1) {
      if (
        typeof temperature === "number" &&
        temperature >= 0 &&
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
        updateHandler={(value) => setActivityData(value)}
        value={activityData}
      >
        {activityList[props.thisStage].map((activityType, index) => (
          <option
            key={"activity-" + index + "-stage-" + props.thisStage}
            value={activityType}
          >
            {activityType}
          </option>
        ))}
      </FormItem>
      {props.thisStage === 1 ? (
        <>
          <FormItem
            type="number"
            ident={"sess-temp-stage-" + props.thisStage}
            label={`Room Temperature (°${unitSystem === 'metric' ? "C" : "F"}):`}
            updateHandler={(value) => setTemperature(value)}
            min="0"
            max="120"
            value={temperature}
          />
          <FormItem
            type="number"
            ident={"sess-humidity-stage-" + props.thisStage}
            label="Room Humidity:"
            updateHandler={(value) => setHumidity(value)}
            min="0"
            max="100"
            value={humidity}
          />
        </>
      ) : (
        <></>
      )}{" "}
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
