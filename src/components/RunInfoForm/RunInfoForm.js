import React from 'react';

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

function RunInfoForm(props) {
  const thisRunData = React.useState(() => {
    if (!props.runData) {
      return {}
    }

    const runData = props.runData.find(obj => obj.uid === props.currentRunUid);
    return runData
  })[0]

  const [currentTemplate, setTemplate] = React.useState(() => {
    if (!props.runData) {
      return null
    }

    const currentProductName = thisRunData.productInfo.productName;
    const templateIndex = productTemplates.findIndex(obj => obj.name === currentProductName)
    return templateIndex.toString()
  });

  const [quantity, setQuantity] = React.useState(() => {
    if (!props.runData) {
      return 1
    }

    const thisRunData = props.runData.find(obj => obj.uid === props.currentRunUid);
    const currentQuantity = thisRunData.productInfo.quantity;
    return currentQuantity
  })


  function handleTemplateChange(e) {
    setTemplate(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleSave(productTemplates[currentTemplate], quantity);
  }

  return(
    <>
      <form>
        <div>
          <label>Product:</label>
          <select onChange={handleTemplateChange} value={currentTemplate === null ? 'default' : currentTemplate }>
            <option value="default" disabled="disabled">Choose a template</option>
            {productTemplates.map((template, index) => 
              <option key={template.name} value={index}>{template.name}</option>
            )}
          </select>
        </div>
        <div>
          <label>BatchQuantity:</label>
          <input onChange={(e) => { setQuantity(e.target.value) }} type="number" defaultValue={quantity} min="0"></input>
        </div>
        <button disabled={currentTemplate === null ? 'disabled' : '' } onClick={handleSubmit}>Save</button>
        <button onClick={(e) => { e.preventDefault(); props.handleCancel() }}>Cancel</button>
      </form>
      <pre>{JSON.stringify(productTemplates[currentTemplate])}</pre>
    </>
  )
}

export default RunInfoForm;