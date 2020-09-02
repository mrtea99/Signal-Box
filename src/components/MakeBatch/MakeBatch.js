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


function MakeBatch(props) {
  const [currentTemplate, setTemplate] = React.useState(null);

  function handleClick() {
    let newData = [...props.batchData];

    //Build new batch object here
    const newBatch = {
      uid: Date.now(),
      batchInfo: {
        batchId: new Date().getUTCMilliseconds()
      },
      productInfo: {
        price: currentTemplate.price,
        productName: currentTemplate.name
      }
    };
    newData.push(newBatch);
    props.setBatchData(newData);
  }

  function handleChange(event) {
    setTemplate(productTemplates[event.target.value]);
  }

  return (
    <>
      <select onChange={handleChange} defaultValue="default">
        <option value="default" disabled="disabled">Choose a template</option>
        {productTemplates.map((template, index) => 
          <option key={template.name} value={index}>{template.name}</option>
        )}
      </select>
      <button onClick={handleClick} disabled={!currentTemplate}>New Batch</button>
    </>
  )
}
  

export default MakeBatch;