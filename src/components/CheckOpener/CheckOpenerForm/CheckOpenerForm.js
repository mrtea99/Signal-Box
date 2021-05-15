import React from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem.js";
import UserSelect from "../../FormItem/UserSelect/UserSelect.js";
import FormLayout from "../../FormItem/FormLayout/FormLayout.js";

import { useTranslation } from "react-i18next";

/**
 * Form for some QA session fields
 */

function CheckOpenerForm(props) {
  const { t } = useTranslation();

  return (
    <>
      <FormLayout>
        <UserSelect
          label={`${t("Checker")}:`}
          ident={"sess-checker-stage-" + props.thisStage}
          updateHandler={(value) =>
            props.setFormData({
              ...props.formData,
              secondaryUser: parseInt(value),
            })
          }
          value={props.formData.secondaryUser}
        />
        <FormItem
          label={`${t("QA Note")}:`}
          type="textarea"
          ident="qa-description"
          updateHandler={(value) => {
            props.setFormData({
              ...props.formData,
              notes: `${t("Requested")}: ${value}`,
            });
          }}
        />
      </FormLayout>
      <FormItem
        label={`${t("Timeframe")}:`}
        type="toggleButton"
        ident={"sess-timeframe-stage-" + props.thisStage}
        itemLabels={[
          t("Immediate"),
          t("Before next shift"),
          t("Before next day"),
        ]}
        itemValues={["now", "shift", "day"]}
        value={props.formData.timeframe}
        updateHandler={(value) => {
          props.setFormData({ ...props.formData, timeframe: value });
        }}
      />
    </>
  );
}

CheckOpenerForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default CheckOpenerForm;
