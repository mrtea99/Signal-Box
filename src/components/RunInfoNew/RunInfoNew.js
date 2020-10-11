import React from "react";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "../RunInfoForm/RunInfoForm.js";

function RunInfoNew(props) {
  function createRun(productTemplateData) {
    let newData = [...props.runData];

    //Build new run object here
    const newRun = {
      uid: Date.now(),
      activeStage: 0,
      completion: null,
      runInfo: {
        runId: new Date().getUTCMilliseconds(),
      },
      productInfo: productTemplateData,
      stages: [
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: true,
        },
      ],
    };
    newData.push(newRun);
    props.setRunData(newData);
    props.setActive(false);
  }

  function handleCancel() {
    props.setActive(false);
  }

  return (
    <>
      {props.active ? (
        <Modal>
          <RunInfoForm handleSave={createRun} handleCancel={handleCancel} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default RunInfoNew;
