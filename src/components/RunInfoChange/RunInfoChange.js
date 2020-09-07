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
  

  function updateRunInfo(productTemplateData, quantity) {
    console.log('update run');

    props.updateRunData(props.currentRunUid, 'productInfo', 'price', productTemplateData.price)
    props.updateRunData(props.currentRunUid, 'productInfo', 'productName', productTemplateData.name)
    props.updateRunData(props.currentRunUid, 'productInfo', 'quantity', quantity)

    //call props.updateRunData multiple times?
    props.setActive(false)
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