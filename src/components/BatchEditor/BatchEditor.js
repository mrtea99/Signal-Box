import React from 'react';

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
      <label htmlFor={props.ident}>{props.name}:</label>
      { props.editable ? editField : viewField }
    </div>
  )
}

function BatchEditor(props) {
  const thisBatchData = props.batchData.find(obj => obj.uid === props.currentBatchUid);
  //const [thisBatchData, setThisBatchData] = React.useState(thatBatchData);

  function handleChange(dataSection, dataKey, e) {
    thisBatchData[dataSection][dataKey] = e.target.value;

    let newData = [...props.batchData];
    //newData[props.currentBatchIndex] = thisBatchData;
    props.setBatchData(newData);
  }

  return (
    <section>
      <h2>Batch Editor:</h2>
      <button onClick={() => props.setCurrentBatchUid(null)}>Clear Current Batch</button>
      {thisBatchData ?
        <>
          <pre>{JSON.stringify(thisBatchData)}</pre>
          <form>
            <fieldset>
              <legend>Product Info</legend>
              <FormItem editable={false} name="Product" ident="product-name" dataSection="productInfo" dataKey="productName" type="text" data={thisBatchData} changeHandler={handleChange} />
              <FormItem editable={true} name="Batch ID" ident="batchid" dataSection="batchInfo" dataKey="batchId" type="number" data={thisBatchData} changeHandler={handleChange} />
              <FormItem editable={false} name="Price" ident="price" dataSection="productInfo" dataKey="price" type="number" data={thisBatchData} changeHandler={handleChange} />
              <FormItem editable={true} name="Quantity" ident="quantity" dataSection="productInfo" dataKey="quantity" type="number" data={thisBatchData} changeHandler={handleChange} />
            </fieldset>
            <fieldset>
              <legend>Batch Info</legend>
            </fieldset>
            <fieldset>
              <legend>Preparation</legend>
              <FormItem editable={true} name="Start Time" ident="prep-start" dataSection="prep" dataKey="startTime" type="datetime-local" data={thisBatchData} changeHandler={handleChange} />
              <FormItem editable={true} name="Finish Time" ident="prep-end" dataSection="prep" dataKey="finishTime" type="datetime-local" data={thisBatchData} changeHandler={handleChange} />
            </fieldset>
            <fieldset>
              <legend>Manufacturing</legend>
              
            </fieldset>
            <fieldset>
              <legend>Cooling</legend>
              
            </fieldset>
            <fieldset>
              <legend>Packaging</legend>
              
            </fieldset>
            <fieldset>
              <legend>Labeling</legend>
              
            </fieldset>
          </form>
        </>
      : <p>Choose batch to edit</p>
      }
    </section>
  )
}

export default BatchEditor;