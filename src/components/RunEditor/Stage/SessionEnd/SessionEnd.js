import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../../../Button/Button.js";
import Modal from "../../../Modal/Modal.js";
import SessionEndForm from "./SessionEndForm/SessionEndForm.js";

import { useTranslation } from "react-i18next";

/**
 * Dialog to end a work session.
 */

function SessionEnd(props) {
  const { t } = useTranslation();

  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={props.className}>
      <Button
        onClick={() => setModalActive(true)}
        fillWidth
        icon="stop"
        featured
      >
        End Session
      </Button>
      {modalActive ? (
        <Modal
          // title={`End ${props.activeSessionData.activity.name} Session`}
          title={t("End This Session", {
            sessionName: props.activeSessionData.activity.name,
          })}
          setActive={setModalActive}
        >
          <SessionEndForm
            setFormActive={setModalActive}
            thisStage={props.thisStage}
            activeSessionData={props.activeSessionData}
            currentRunId={props.currentRunId}
          />
        </Modal>
      ) : null}
    </div>
  );
}

SessionEnd.propTypes = {
  className: PropTypes.string,
  activeSessionData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  currentRunId: PropTypes.number.isRequired,
};

export default SessionEnd;
