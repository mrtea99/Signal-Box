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
  // const [currentTemplate, setTemplate] = React.useState(props.defaultTemplate);

  const [currentTemplate, setTemplate] = React.useState(() => {
    if (!props.runData) {
      return 'default'
    }

    const thisRunData = props.runData.find(obj => obj.uid === props.currentRunUid);
    const currentProductName = thisRunData.productInfo.productName;
    const templateIndex = productTemplates.findIndex(obj => obj.name === currentProductName)
    return templateIndex.toString()
  });


  function handleTemplateChange(e) {
    setTemplate(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleSave(productTemplates[currentTemplate]);
  }

  function handleChange(e) {
    // setQuantity(e.target.value);
  }

  return(
    <>
      <form>
        <select onChange={handleTemplateChange} value={currentTemplate}>
          <option value="default" disabled="disabled">Choose a template</option>
          {productTemplates.map((template, index) => 
            <option key={template.name} value={index}>{template.name}</option>
          )}
        </select>
        <label>Quantity:</label>
        <input onChange={handleChange} type="number" defaultValue='0'></input>
        <button disabled={currentTemplate === null ? 'disabled' : '' } onClick={handleSubmit}>Save</button>
      </form>
      <pre>{JSON.stringify(productTemplates[currentTemplate])}</pre>
    </>
  )
}

export default RunInfoForm;