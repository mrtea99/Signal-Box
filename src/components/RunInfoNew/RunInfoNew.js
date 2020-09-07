import React from 'react';

import Modal from '../Modal/Modal.js';
import RunInfoForm from '../RunInfoForm/RunInfoForm.js';

function RunInfoNew(props) {

  function createRun(productTemplateData, quantity) {
    let newData = [...props.runData];

    //Build new run object here
    const newRun = {
      uid: Date.now(),
      activeStep: 0,
      runInfo: {
        runId: new Date().getUTCMilliseconds()
      },
      productInfo: {
        price: productTemplateData.price,
        productName: productTemplateData.name,
        quantity: quantity
      },
      prep: {
        startTime: '',
        finishTime: ''
      }
    };
    newData.push(newRun);
    props.setRunData(newData);
    props.setActive(false)
  }

  function handleCancel() {
    props.setActive(false);
  }

  return(
    <>
      {props.active ? 
        <Modal>
          <RunInfoForm 
            handleSave={createRun}
            handleCancel={handleCancel}
          />
        </Modal>
        : <></> }
    </>
  )
}

export default RunInfoNew;