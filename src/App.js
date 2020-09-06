import React from 'react';
import './App.css';

// import MakeBatch from './components/MakeBatch/MakeBatch.js';
import BatchList from './components/BatchList/BatchList.js';
import BatchEditor from './components/BatchEditor/BatchEditor.js';
import BatchInfoNew from './components/BatchInfoNew/BatchInfoNew.js';
import BatchInfoChange from './components/BatchInfoChange/BatchInfoChange.js';

function App() {
  const savedBatchData = () => JSON.parse(window.localStorage.getItem('batchData')) || []

  const [batchData, setBatchData] = React.useState(savedBatchData)
  const [currentBatchUid, setCurrentBatchUid] = React.useState(null)
  const [activeStep, setActiveStep] = React.useState(0);

  const [modalNewActive, setModalNewActive] = React.useState(false)
  const [modalChangeActive, setModalChangeActive] = React.useState(false)


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

  function handleAddClick(e) {
    e.preventDefault();

    setModalNewActive(true)
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
        <button onClick={handleAddClick}>New Batch +</button>
        <BatchInfoNew 
          active={modalNewActive}
          setActive={setModalNewActive}
          batchData={batchData}
          setBatchData={setBatchData}
        />
      </section>
      <section>
        <BatchEditor 
          batchData={batchData}
          currentBatchUid={currentBatchUid}
          setCurrentBatchUid={setCurrentBatchUid}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          updateBatchData={updateBatchData}
          modalActive={modalChangeActive}
          setModalActive={setModalChangeActive}
        />
        <BatchInfoChange 
          active={modalChangeActive}
          setActive={setModalChangeActive}
          currentBatchUid={currentBatchUid}
          batchData={batchData}
        />
      </section>
    </main>
  );
}

export default App;
