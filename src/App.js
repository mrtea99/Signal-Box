import React from 'react';
import './App.css';

import MakeBatch from './components/MakeBatch/MakeBatch.js';
import BatchList from './components/BatchList/BatchList.js';
import BatchEditor from './components/BatchEditor/BatchEditor.js';

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

function App() {
  const savedBatchData = () => JSON.parse(window.localStorage.getItem('batchData')) || defaultBatchData
  //const savedBatchData = () => defaultBatchData

  const [batchData, setBatchData] = React.useState(savedBatchData)
  // const [currentBatchData, setCurrentBatchData] = React.useState(null)
  const [currentBatchUid, setCurrentBatchUid] = React.useState(null)
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    window.localStorage.setItem('batchData', JSON.stringify(batchData));
  },[batchData, activeStep])

  function updateBatchData(uid, dataSection, dataKey, newValue) {
    const updatedBatchData = batchData.map(batch => {
      if (batch.uid === uid) {
        //A new object should be created and returned here, but this is working for the time being
        batch[dataSection][dataKey] = newValue
        return batch
      }
      return batch
    })
    setBatchData(updatedBatchData);
  }

  return (
    <main className="app-wrap">
      <section>
        <BatchList
          batchData={batchData}
          setBatchData={setBatchData}
          // setCurrentBatchData={setCurrentBatchData}
          setCurrentBatchUid={setCurrentBatchUid}
          setActiveStep={setActiveStep}
        />
        <MakeBatch
          batchData={batchData}
          setBatchData={setBatchData}
        />
      </section>
      <BatchEditor 
        // setBatchData={setBatchData}
        batchData={batchData}
        // currentBatchData={currentBatchData}
        currentBatchUid={currentBatchUid}
        // setCurrentBatchData={setCurrentBatchData}
        setCurrentBatchUid={setCurrentBatchUid}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        updateBatchData={updateBatchData}
      />
    </main>
  );
}

export default App;
