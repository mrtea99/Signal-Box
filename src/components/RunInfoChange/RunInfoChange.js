import React from 'react';

import Modal from '../Modal/Modal.js';
import RunInfoForm from '../RunInfoForm/RunInfoForm.js';


function RunInfoChange(props) {
  function updateRunInfo(productTemplateData, quantity) {
    console.log('update run');

    props.updateRunData(props.currentRunUid, 'productInfo', 'price', productTemplateData.price)
    props.updateRunData(props.currentRunUid, 'productInfo', 'productName', productTemplateData.name)
    props.updateRunData(props.currentRunUid, 'productInfo', 'quantity', quantity)

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
            runData={props.runData}
            currentRunUid={props.currentRunUid}
            handleSave={updateRunInfo}
            handleCancel={handleCancel}
          />
        </Modal>
        : <></> }
    </>
  )
}

export default RunInfoChange;