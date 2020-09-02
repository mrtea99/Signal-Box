import React from 'react';

function FormItem(props) {
  const itemValue = props.data[props.dataSection][props.dataKey];

  if (itemValue === undefined) {
    return (<></>)
  }

  const viewField = (
    <span>{itemValue}</span>
  )
  const editField = (
    <input id={props.ident} type={props.type} onChange={(e) => props.changeHandler(props.dataSection, props.dataKey, e)} value={itemValue}></input>
  )

  return (
    <>
      <label htmlFor={props.ident}>{props.name}:</label>
      { props.editable ? editField : viewField }
    </>
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
            <FormItem editable={true} name="Batch ID" ident="batchid" dataSection="batchInfo" dataKey="batchId" type="number" data={thisBatchData} changeHandler={handleChange} />
            <FormItem editable={false} name="Price" ident="price" dataSection="productInfo" dataKey="price" type="number" data={thisBatchData} changeHandler={handleChange} />
            <FormItem editable={true} name="Quantity" ident="quantity" dataSection="productInfo" dataKey="quantity" type="number" data={thisBatchData} changeHandler={handleChange} />
          </form>
        </>
      : <p>Choose batch to edit</p>
      }
    </section>
  )
}

export default BatchEditor;