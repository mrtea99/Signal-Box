import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Button from "../../../../Button/Button.js";
import ButtonSpacer from "../../../../Button/ButtonSpacer/ButtonSpacer.js";
import FormItem from "../../../../FormItem/FormItem.js";
import UserSelect from "../../../../FormItem/UserSelect/UserSelect.js";

import { selectCurrentUser } from "../../../../UserSwitcher/usersSlice.js";

import activityList from "../../../../../data/activities.json";
import AtmosBatcher from "../../../../AtmosBatcher/AtmosBatcher.js";

function SessionStartForm(props) {
  const activeUser = useSelector(selectCurrentUser);

  const updateAssistor = function (assistorName) {
    props.setFormData({ ...props.formData, assistor: assistorName });
  };

  const updateAtmosData = function (newAtmosData) {
    props.setFormData({ ...props.formData, atmosData: newAtmosData });
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
        value={parseInt(props.formData.assistor) || null}
        excludedUsers={[activeUser]}
      />
      {props.formData.activity.fields &&
      props.formData.activity.fields.includes("atmos") ? (
        <AtmosBatcher
          atmosData={props.formData.atmosData}
          setAtmosData={updateAtmosData}
        />
      ) : null}
      <ButtonSpacer align="right">
        <Button onClick={() => props.handleCancel()} color="cancel">
          Cancel
        </Button>
        <Button onClick={props.handleNewClick} icon="start">
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
