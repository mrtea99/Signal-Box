import React from 'react';

import StageControl from '../StageControl/StageControl.js';
import Button from '../Button/Button.js';

import styles from './RunEditor.module.css';


function RunEditor(props) {
  const thisRunData = props.runData.find(obj => obj.uid === props.currentRunUid);

  function handleChange(dataSection, dataKey, e) {
    props.updateRunData(props.currentRunUid, dataSection, dataKey, e.target.value)
  }

  function handleEditInfoClick(e) {
    e.preventDefault();

    props.setModalActive(true)
  }

  return (
    <>
      {thisRunData ?
        <div className={[styles.runEditor, styles.runEditorActive].join(' ')}>
          <header>
            <Button text="< Exit" clickHandler={() => props.setCurrentRunUid(null)} />
          </header>
          <div>
            <section className={styles.runInfo}>
              <div className={[styles.runInfoSec, styles.runInfoProd].join(' ')}>
                <h2 className={styles.runInfoTitle}>Production Run of:</h2>
                <h3 className={styles.runInfoName}>{thisRunData.productInfo.productName}</h3>
                {/* <FormItem editable={false} name="Product" ident="product-name" dataSection="productInfo" dataKey="productName" type="text" data={thisRunData} changeHandler={handleChange} /> */}
                <FormItem editable={false} name="SKU" ident="productSKU" dataSection="productInfo" dataKey="productSKU" type="number" data={thisRunData} changeHandler={handleChange} />
              </div>
              <div className={[styles.runInfoSec, styles.runInfoRun].join(' ')}>
                <FormItem editable={false} name="Run ID" ident="runid" dataSection="runInfo" dataKey="runId" type="number" data={thisRunData} changeHandler={handleChange} />
                <FormItem editable={false} name="Batch Quantity" ident="quantity" dataSection="productInfo" dataKey="batchQuantity" type="number" data={thisRunData} changeHandler={handleChange} />
                <Button text="Run Info" clickHandler={handleEditInfoClick} />
              </div>
            </section>

            <StageControl 
              thisRunData={thisRunData}
              runData={props.runData}
              currentRunUid={props.currentRunUid}
              updateRunData={props.updateRunData}
            />
            
          </div>
          <pre>{JSON.stringify(thisRunData)}</pre>
        </div>
      : 
        <div className={styles.runEditor}>
          <p>No Run loaded</p>
        </div>
      }
    </>
  )
}



function FormItem(props) {
  const itemValueSection = props.data[props.dataSection];
  let itemValue = {}
  if (itemValueSection !== undefined) {
    itemValue = props.data[props.dataSection][props.dataKey]
  }

  if (itemValueSection === undefined && itemValue === undefined) {
    return (<></>)
  }

  const viewField = (
    <span>{itemValue}</span>
  )
  const editField = (
    <input 
      id={props.ident} 
      name={props.ident} 
      type={props.type} 
      onChange={(e) => props.changeHandler(props.dataSection, props.dataKey, e)} 
      value={itemValue} />
  )

  return (
    <div>
      <label htmlFor={props.ident}>{props.name}: </label>
      { props.editable ? editField : viewField }
    </div>
  )
}






export default RunEditor;