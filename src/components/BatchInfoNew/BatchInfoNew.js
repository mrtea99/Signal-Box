import React from 'react';

import Modal from '../Modal/Modal.js';
import BatchInfoForm from '../BatchInfoForm/BatchInfoForm.js';

function BatchInfoNew(props) {

  function createBatch(productTemplateData) {
    let newData = [...props.batchData];

    //Build new batch object here
    const newBatch = {
      uid: Date.now(),
      activeStep: 0,
      batchInfo: {
        batchId: new Date().getUTCMilliseconds()
      },
      productInfo: {
        price: productTemplateData.price,
        productName: productTemplateData.name,
        quantity: 0
      },
      prep: {
        startTime: '',
        finishTime: ''
      }
    };
    newData.push(newBatch);
    props.setBatchData(newData);
  }

  return(
    <>
      {props.active ? 
        <Modal>
          <BatchInfoForm 
            handleSave={createBatch}
          />
        </Modal>
        : <></> }
    </>
  )
}

export default BatchInfoNew;