import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Button from "../../../../Button/Button.js";
import ButtonSpacer from "../../../../Button/ButtonSpacer/ButtonSpacer.js";
import FormItem from "../../../../FormItem/FormItem.js";
import TemperatureField from "../../../../FormItem/TemperatureField/TemperatureField.js";
import UserSelect from "../../../../FormItem/UserSelect/UserSelect.js";

import activityList from "../../../../../data/activities.json";

function SessionStartForm(props) {
  const activeUser = useSelector((state) => state.users.currentUser);

  const [temperature, setTemperature] = React.useState(70);
  const [humidity, setHumidity] = React.useState(50);

  const validateForm = function () {
    if (
      props.formData.activity.fields &&
      props.formData.activity.fields.includes("atmos")
    ) {
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

  const updateAssistor = function (assistorName) {
    props.setFormData({ ...props.formData, assistor: assistorName });
  };

  return (
    <form>
      <FormItem
        type="select"
        ident={"sess-activity-stage-" + props.thisStage}
        label="Activity:"
        updateHandler={(value) =>
          props.setFormData({
            ...props.formData,
            activity: activityList[props.thisStage][value],
          })
        }
        value={activityList[props.thisStage].indexOf(props.formData.activity)}
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
        updateHandler={updateAssistor}
        value={props.formData.assistor || null}
        excludedUsers={[activeUser]}
      />
      {props.formData.activity.fields &&
      props.formData.activity.fields.includes("atmos") ? (
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
        <Button onClick={() => props.handleCancel()} color="cancel">
          Cancel
        </Button>
        <Button
          onClick={props.handleNewClick}
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
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNewClick: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default SessionStartForm;
