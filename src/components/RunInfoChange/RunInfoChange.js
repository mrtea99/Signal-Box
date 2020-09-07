import React from 'react';

import Modal from '../Modal/Modal.js';
import RunInfoForm from '../RunInfoForm/RunInfoForm.js';

const productTemplates = [
  {
    name: 'Product One',
    price: 50
  },
  {
    name: 'Product Two',
    price: 100
  }
]

function RunInfoChange(props) {
  // const thisRunData = props.runData.find(obj => obj.uid === props.currentRunUid);
  //const currentProductName = thisRunData.productInfo.productName;
  //const templateIndex = productTemplates.findIndex(obj => obj.name === currentProductName)
  //const templateIndex = 0
  

  function updateRunInfo() {
    console.log('update run');
    //call props.updateRunData multiple times?
  }

  return(
    <>
      {props.active ? 
        <Modal>
          <RunInfoForm
            runData={props.runData}
            currentRunUid={props.currentRunUid}
            handleSave={updateRunInfo}
          />
        </Modal>
        : <></> }
    </>
  )
}

export default RunInfoChange;