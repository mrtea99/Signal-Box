import React from "react";
import PropTypes from "prop-types";

import Button from "../../../Button/Button.js";
import ButtonSpacer from "../../../Button/ButtonSpacer/ButtonSpacer.js";
import FormItem from "../../../FormItem/FormItem.js";
import TemperatureField from "../../../FormItem/TemperatureField/TemperatureField.js";
import UserSelect from "../../../FormItem/UserSelect/UserSelect.js";

import stageNames from "../../../../data/stageNames.json";
import activityList from "../../../../data/activities.json";

function SessionStartForm(props) {
  // Activity type (all)
  const [activityData, setActivityData] = React.useState(
    activityList[props.thisStage][0]
  );
  // Room temp (manu and cool)
  const [temperature, setTemperature] = React.useState(70);
  // Room humidity (manu and cool)
  const [humidity, setHumidity] = React.useState(50);
  //Assistor
  const [assistor, setAssistor] = React.useState(null);

  const handleNewClick = function (e) {
    e.preventDefault();

    const newsessionId = Date.now();

    const newSession = {
      sessionId: newsessionId,
      stage: stageNames[props.thisStage],
      type: "work",
      startTime: Date.now(),
      endTime: null,
      activity: activityData,
      user: props.activeUser,
      secondaryUser: assistor,
    };

    if (props.thisStage === 1) {
      newSession.temperature = temperature;
      newSession.humidity = humidity;
    }

    props.addSession(newSession, props.thisStage);

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
      <UserSelect
        label="Assistor:"
        ident={"sess-assistor-stage-" + props.thisStage}
        updateHandler={setAssistor}
        value={assistor}
        excludedUsers={[props.activeUser]}
      />
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

SessionStartForm.propTypes = {
  thisStage: PropTypes.number.isRequired,
  activeUser: PropTypes.string.isRequired,
  addSession: PropTypes.func.isRequired,
  setFormActive: PropTypes.func.isRequired,
};

export default SessionStartForm;
