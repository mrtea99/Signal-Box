import React from 'react';
import StageControl from '../StageControl/StageControl.js';


function RunEditor(props) {
  const [thisRunData, setThisRunData] = React.useState(props.runData.find(obj => obj.uid === props.currentRunUid));

  React.useEffect(() => {
    const newRunData = props.runData.find(obj => obj.uid === props.currentRunUid)

    if (newRunData !== undefined) {
      setThisRunData(newRunData);
    }
    else {
      setThisRunData(null)
    }
  }, [props.runData, props.currentRunUid]);

  function handleChange(dataSection, dataKey, e) {
    props.updateRunData(props.currentRunUid, dataSection, dataKey, e.target.value)
  }

  function handleEditInfoClick(e) {
    e.preventDefault();

    props.setModalActive(true)
  }

  return (
    <section>
      <h2>Run Editor:</h2>
      {thisRunData ?
        <>
          <button onClick={() => props.setCurrentRunUid(null)}>Clear Current Run</button>
          <pre>{JSON.stringify(thisRunData)}</pre>
          <form>
            <fieldset>
              <legend>Product Info</legend>
              <FormItem editable={false} name="Product" ident="product-name" dataSection="productInfo" dataKey="productName" type="text" data={thisRunData} changeHandler={handleChange} />
              <FormItem editable={true} name="Price" ident="price" dataSection="productInfo" dataKey="price" type="number" data={thisRunData} changeHandler={handleChange} />
            </fieldset>
            <fieldset>
              <legend>Run Info</legend>
              <FormItem editable={true} name="Run ID" ident="runid" dataSection="runInfo" dataKey="runId" type="number" data={thisRunData} changeHandler={handleChange} />
              <FormItem editable={false} name="Quantity" ident="quantity" dataSection="productInfo" dataKey="quantity" type="number" data={thisRunData} changeHandler={handleChange} />
              <button onClick={handleEditInfoClick}>Edit</button>
            </fieldset>

            <fieldset>
              <StageControl 
                thisRunData={thisRunData}
                runData={props.runData}
                currentRunUid={props.currentRunUid}
                updateRunData={props.updateRunData}
              />
              
            </fieldset>
          </form>
        </>
      : <p>Choose run to edit</p>
      }
    </section>
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
      <label htmlFor={props.ident}>{props.name}:</label>
      { props.editable ? editField : viewField }
    </div>
  )
}






export default RunEditor;