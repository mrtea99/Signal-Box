import React from 'react';

import Modal from '../Modal/Modal.js';
import BatchInfoForm from '../BatchInfoForm/BatchInfoForm.js';

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

function BatchInfoChange(props) {
  // const thisBatchData = props.batchData.find(obj => obj.uid === props.currentBatchUid);
  //const currentProductName = thisBatchData.productInfo.productName;
  //const templateIndex = productTemplates.findIndex(obj => obj.name === currentProductName)
  //const templateIndex = 0
  

  function updateBatchInfo() {
    console.log('update batch');
    //call props.updateBatchData multiple times?
  }

  return(
    <>
      {props.active ? 
        <Modal>
          <BatchInfoForm
            batchData={props.batchData}
            currentBatchUid={props.currentBatchUid}
            handleSave={updateBatchInfo}
          />
        </Modal>
        : <></> }
    </>
  )
}

export default BatchInfoChange;