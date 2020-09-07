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






function RunEditor(props) {
  const [thisRunData, setThisRunData] = React.useState(props.runData.find(obj => obj.uid === props.currentRunUid));
  const [activeStep, setActiveStep] = React.useState(() => {
    if (thisRunData !== undefined) {
      return thisRunData.activeStep
    }
    else {
      return 0
    }
  });

  React.useEffect(() => {
    const newRunData = props.runData.find(obj => obj.uid === props.currentRunUid)

    if (newRunData !== undefined) {
      setThisRunData(newRunData);
      setActiveStep(newRunData.activeStep)
    }
    else {
      setThisRunData(null)
      setActiveStep(null)
    }
  }, [props.runData, props.currentRunUid]);

  const stepPrep = (
    <fieldset>
      <legend>Preparation</legend>
      <FormItem editable={true} name="Start Time" ident="prep-start" dataSection="prep" dataKey="startTime" type="datetime-local" data={thisRunData} changeHandler={handleChange} />
      <FormItem editable={true} name="Finish Time" ident="prep-end" dataSection="prep" dataKey="finishTime" type="datetime-local" data={thisRunData} changeHandler={handleChange} />
    </fieldset>
  )
  const stepMan = (
    <fieldset>
      <legend>Manufacturing</legend>
    </fieldset>
  )
  const stepCool = (
    <fieldset>
      <legend>Cooling</legend>
    </fieldset>
  )
  const stepPack = (
    <fieldset>
      <legend>Packaging</legend>
    </fieldset>
  )
  const stepLabel = (
    <fieldset>
      <legend>Labeling</legend>
    </fieldset>
  )
  const stepArr = [stepPrep, stepMan, stepCool, stepPack, stepLabel]

  function handleChange(dataSection, dataKey, e) {
    props.updateRunData(props.currentRunUid, dataSection, dataKey, e.target.value)
  }

  function handleNavigation(dir, e) {
    e.preventDefault()

    // thisRunData.activeStep = dir;

    if (dir !== -1 && dir < stepArr.length) {
      setActiveStep(dir)
      props.updateRunData(props.currentRunUid, null, 'activeStep', dir)
    }
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
            {stepArr[activeStep]}
            { activeStep > 0 ?
              <button onClick={(e) => handleNavigation(activeStep - 1, e)}>Previous Step</button>
            : <></> }
            { activeStep < stepArr.length - 1 ?
              <button onClick={(e) => handleNavigation(activeStep + 1, e)}>Next Step</button>
            : <></> }
          </form>
        </>
      : <p>Choose run to edit</p>
      }
    </section>
  )
}

export default RunEditor;