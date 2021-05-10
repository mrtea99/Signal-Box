import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../../Button/Button.js";
import CheckOpenerForm from "../../../CheckOpener/CheckOpenerForm/CheckOpenerForm.js";
import FormItem from "../../../FormItem/FormItem.js";
import WeightField from "../../../FormItem/WeightField/WeightField.js";
import Modal from "../../../Modal/Modal.js";
import FormLayout from "../../../FormItem/FormLayout/FormLayout.js";

import UnitSystemContext from "../../../../contexts/UnitSystemContext.js";

import getItemType from "../../../../utils/getItemType.js";

import { selectRun } from "../../../RunList/runsSlice.js";
import { selectCurrentUser } from "../../../UserSwitcher/usersSlice.js";

// import stageNames from "../../../../../data/stageNames.json";

import { useTranslation } from "react-i18next";
import SessionCard from "../SessionCard/SessionCard.js";

/**
 * Form fields to end a work session.
 */

function SessionEnd(props) {
  const { t } = useTranslation();

  const [modalActive, setModalActive] = useState(false);

  const unitSystem = useContext(UnitSystemContext);

  const activeUser = useSelector(selectCurrentUser);

  const thisRunData = useSelector((state) =>
    selectRun(state, props.currentRunId)
  );

  const itemType = getItemType(props.thisStage);

  const showAmounts = props.activeSessionData.activity.fields.includes(
    "amounts"
  );
  const showWeight = props.activeSessionData.activity.fields.includes("weight");
  const showQa = props.activeSessionData.activity.fields.includes("qa");

  const dispatch = useDispatch();

  // After Statuses
  const defaultFormData = {
    noteData: props.activeSessionData["notes"] || "",
    amount: props.activeSessionData["amount"] || (showAmounts ? 0 : null),
    amountBad: props.activeSessionData["amountBad"] || (showAmounts ? 0 : null),
    averageWeight:
      props.activeSessionData["averageWeight"] || (showWeight ? 0 : null),
    skipQa:
      props.thisStage === 0 || props.thisStage === 4 || !showQa ? true : false,
    qaFormData: {
      notes: "",
      timeframe: "now",
    },
  };

  // Notes (all)
  const [noteData, setNoteData] = useState(defaultFormData.noteData);
  // Amount made (manu, pack, label)
  const [amount, setAmount] = useState(defaultFormData.amount);
  // Amount Bad (manu, pack, label)
  const [amountBad, setAmountBad] = useState(defaultFormData.amountBad);
  // Average unit/batch weight (manu, pack)
  const [averageWeight, setAverageWeight] = useState(
    defaultFormData.averageWeight
  );

  const [skipQa, setSkipQa] = useState(defaultFormData.skipQa);
  const [qaFormData, setQaFormData] = useState(defaultFormData.qaFormData);

  const resetFormData = function () {
    setNoteData(defaultFormData.noteData);
    setAmount(defaultFormData.amount);
    setAmountBad(defaultFormData.amountBad);
    setAverageWeight(defaultFormData.averageWeight);
    setSkipQa(defaultFormData.skipQa);
    setQaFormData(defaultFormData.qaFormData);
  };

  const handleOpen = function () {
    resetFormData();

    setModalActive(true);
  };

  const handleEndClick = function () {
    //Start QA Session
    if (!skipQa) {
      const newsessionId = Date.now();

      const newSession = {
        sessionId: newsessionId,
        runId: props.currentRunId,
        // stage: stageNames[props.thisStage],
        stage: props.thisStage,
        type: "qa",
        startTime: new Date().toISOString(),
        endTime: null,
        user: activeUser,
        ...qaFormData,
      };

      dispatch({
        type: "sessions/add",
        payload: {
          sessionData: newSession,
        },
      });
    }

    //End Work Session
    dispatch({
      type: "sessions/end",
      payload: {
        sessionId: props.activeSessionData.sessionId,
        extraData: {
          notes: noteData,
          amount: amount,
          amountType: itemType,
          amountBad: amountBad,
          averageWeight: averageWeight,
          endTime: new Date().toISOString(),
        },
      },
    });

    setModalActive(false);
  };

  const handleFieldChange = function (value, setState, dataKey) {
    setState(value);
  };

  const weightLabel = function (stageNum, system) {
    let itemName = "";
    let targetWeight;
    const productInfo = thisRunData.productInfo;

    switch (stageNum) {
      case 1:
        itemName = t("Average Batch Weight");
        targetWeight = productInfo.batchWeight;
        break;
      case 2:
        itemName = t("Average Unit Weight");
        targetWeight = productInfo.unitWeight;
        break;
      default:
        return t("Average Item Weight");
    }

    //todo abstract metric conversion
    return `${itemName} (${t("Target")}: ${
      unitSystem === "metric"
        ? Math.round(targetWeight / 0.035274) + " g"
        : targetWeight + " oz"
    })`;
  };

  return (
    <div className={props.className}>
      <Button onClick={handleOpen} fillWidth icon="stop" featured>
        End Session
      </Button>
      {modalActive ? (
        <Modal
          title={t("End This Session", {
            sessionName: props.activeSessionData.activity.name,
          })}
          setActive={setModalActive}
          controls={
            <>
              <Button onClick={() => setModalActive(false)} color="cancel">
                {t("Cancel")}
              </Button>
              <Button onClick={handleEndClick} icon="stop">
                {t("End Session")}
              </Button>
            </>
          }
        >
          <form>
            {showAmounts ? (
              <FormLayout>
                <FormItem
                  type="number"
                  ident={"sess-amount-step-" + props.thisStage}
                  label={`${t("Completed")} ${itemType}:`}
                  updateHandler={(value) =>
                    handleFieldChange(value, setAmount, "amount")
                  }
                  value={amount}
                  min="0"
                />
                <FormItem
                  type="number"
                  ident={"sess-amount-bad-step-" + props.thisStage}
                  label={`${t("Defective")} ${itemType}:`}
                  updateHandler={(value) =>
                    handleFieldChange(value, setAmountBad, "amountBad")
                  }
                  value={amountBad}
                  min="0"
                />
              </FormLayout>
            ) : null}

            {showWeight ? (
              <WeightField
                ident={"sess-average-weight-step-" + props.thisStage}
                label={weightLabel(props.thisStage, unitSystem)}
                updateHandler={(value) =>
                  handleFieldChange(value, setAverageWeight, "averageWeight")
                }
                value={averageWeight}
              />
            ) : null}

            {showQa ? (
              <>
                {skipQa ? null : ( // <p>{t("QA Skipped")}</p>
                  <SessionCard title="New QA Check" padding type="qa">
                    <CheckOpenerForm
                      formData={qaFormData}
                      setFormData={setQaFormData}
                      thisStage={props.thisStage}
                    />
                  </SessionCard>
                )}
                <FormItem
                  label={t("Skip QA Check")}
                  type="checkbox"
                  ident="sess-skip-qa"
                  updateHandler={(value) => setSkipQa(value)}
                  checked={skipQa}
                  spacing="both"
                />
              </>
            ) : null}
            <FormItem
              type="textarea"
              ident={"sess-notes-step-" + props.thisStage}
              label={`${t("Note")}:`}
              updateHandler={(value) =>
                handleFieldChange(value, setNoteData, "notes")
              }
              value={noteData}
            />
          </form>
        </Modal>
      ) : null}
    </div>
  );
}

SessionEnd.propTypes = {
  activeSessionData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default SessionEnd;
