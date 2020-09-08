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


function MakeRun(props) {
  const [currentTemplate, setTemplate] = React.useState(null);

  function handleClick() {
    let newData = [...props.runData];

    //Build new run object here
    const newRun = {
      uid: Date.now(),
      activeStage: 0,
      runInfo: {
        runId: new Date().getUTCMilliseconds()
      },
      productInfo: {
        price: currentTemplate.price,
        productName: currentTemplate.name,
        quantity: 0
      },
      prep: {
        startTime: '',
        finishTime: ''
      }
    };
    newData.push(newRun);
    props.setRunData(newData);
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
      <button onClick={handleClick} disabled={!currentTemplate}>Save New Run</button>
    </>
  )
}
  

export default MakeRun;