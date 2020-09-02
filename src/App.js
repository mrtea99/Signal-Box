import React from 'react';
import './App.css';

const defaultBatchData = [
  {
    batchInfo: {
      batchId: 1,
      startDate: '2020-01-01',
      manufacturer: 'John',
      quantity: 5
    },
    prep: {
      startTime: null,
      endTime: null
    }
  },
  {
    batchInfo: {
      batchId: 2,
      startDate: '2020-02-01',
      manufacturer: 'John',
      quantity: 10
    },
    prep: {
      startTime: null,
      endTime: null
    }
  }
]

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
      uid: 0,
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

function BatchList(props) {
  function editBatch(index) {
    props.setCurrentBatchIndex(index)
  }
  function deleteBatch(index) {
    let newData = [...props.batchData];
    newData.splice(index, 1)
    props.setBatchData(newData);
  }

  const batchItems = props.batchData.map((batch, index) =>
    <tr key={batch.batchInfo.batchId}>
      <td>{batch.batchInfo.batchId}</td>
      <td>{batch.productInfo.productName}</td>
      <td><button onClick={(e) => editBatch(index)}>Edit</button></td>
      <td><button onClick={(e) => deleteBatch(index)}>Delete</button></td>
    </tr>
  )

  return (
    <>
      <h2>Batch List:</h2>
      <table>
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Product</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {batchItems}
        </tbody>
      </table>
    </>
  )
}

function FormItem(props) {
  return (
    <>
    <label htmlFor={props.ident}>{props.name}:</label>
    <input id={props.ident} type={props.type} onChange={(e) => props.changeHandler(props.dataSection, props.dataKey, e)} value={props.data}></input>
    </>
  )
}

function BatchEditor(props) {
  // const [thisBatchData, setThisBatchData] = React.useState(props.batchData[props.currentBatchIndex]);
  // React.useEffect(() => {
  //   setThisBatchData(props.currentBatchData);
  // },[props.currentBatchData])
  
  let thisBatchData = props.batchData[props.currentBatchIndex];

  function handleChange(dataSection, dataKey, e) {
    thisBatchData[dataSection][dataKey] = e.target.value;

    let newData = [...props.batchData];
    newData[props.currentBatchIndex] = thisBatchData;
    props.setBatchData(newData);
  }

  return (
    <section>
      <h2>Batch Editor:</h2>
      <button onClick={() => props.setCurrentBatchIndex(null)}>Clear Current Batch</button>
      {thisBatchData ?
        <>
          <pre>{JSON.stringify(thisBatchData)}</pre>
          <form>
            <FormItem name="Batch ID" ident="batchid" data={thisBatchData.batchInfo.batchId} dataSection="batchInfo" dataKey="batchId" type="number" changeHandler={handleChange} />
            <FormItem name="Price" ident="price" data={thisBatchData.productInfo.price} dataSection="productInfo" dataKey="price" type="number" changeHandler={handleChange} />
          </form>
        </>
      : <p>Choose batch to edit</p>
      }
    </section>
  )
}

function App() {
  const savedBatchData = () => JSON.parse(window.localStorage.getItem('batchData')) || defaultBatchData
  //const savedBatchData = () => defaultBatchData

  const [batchData, setBatchData] = React.useState(savedBatchData)
  const [currentBatchData, setCurrentBatchData] = React.useState(null)
  const [currentBatchIndex, setCurrentBatchIndex] = React.useState(null)

  React.useEffect(() => {
    window.localStorage.setItem('batchData', JSON.stringify(batchData));
  },[batchData])

  return (
    <main className="app-wrap">
      <section>
        <BatchList
          batchData={batchData}
          setBatchData={setBatchData}
          setCurrentBatchData={setCurrentBatchData}
          setCurrentBatchIndex={setCurrentBatchIndex} 
        />
        <MakeBatch
          batchData={batchData}
          setBatchData={setBatchData}
        />
      </section>
      <BatchEditor 
        setCurrentBatchIndex={setCurrentBatchIndex}
        currentBatchData={currentBatchData}
        setBatchData={setBatchData}
        batchData={batchData}
        currentBatchIndex={currentBatchIndex} />
    </main>
  );
}

export default App;
