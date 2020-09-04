import React from 'react';
import './App.css';

import MakeBatch from './components/MakeBatch/MakeBatch.js';
import BatchList from './components/BatchList/BatchList.js';
import BatchEditor from './components/BatchEditor/BatchEditor.js';

function App() {
  const savedBatchData = () => JSON.parse(window.localStorage.getItem('batchData')) || []

  const [batchData, setBatchData] = React.useState(savedBatchData)
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

  function deleteBatch(uid) {
    const updatedBatchData = batchData.filter(batch => uid !== batch.uid)
    setBatchData(updatedBatchData);
  }

  function setCurrentBatch(uid, activeStep) {
    setCurrentBatchUid(uid)
    setActiveStep(activeStep)
  }


  return (
    <main className="app-wrap">
      <section>
        <BatchList
          batchData={batchData}
          setBatchData={setBatchData}
          setCurrentBatchUid={setCurrentBatchUid}
          setActiveStep={setActiveStep}
          deleteBatch={deleteBatch}
          setCurrentBatch={setCurrentBatch}
        />
        <MakeBatch
          batchData={batchData}
          setBatchData={setBatchData}
        />
      </section>
      <BatchEditor 
        batchData={batchData}
        currentBatchUid={currentBatchUid}
        setCurrentBatchUid={setCurrentBatchUid}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        updateBatchData={updateBatchData}
      />
    </main>
  );
}

export default App;
