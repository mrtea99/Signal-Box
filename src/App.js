import React from 'react';
import './App.css';

// import MakeRun from './components/MakeRun/MakeRun.js';
import RunList from './components/RunList/RunList.js';
import RunEditor from './components/RunEditor/RunEditor.js';
import RunInfoNew from './components/RunInfoNew/RunInfoNew.js';
import RunInfoChange from './components/RunInfoChange/RunInfoChange.js';

function App() {
  const savedRunData = () => JSON.parse(window.localStorage.getItem('runData')) || []

  const [runData, setRunData] = React.useState(savedRunData)
  const [currentRunUid, setCurrentRunUid] = React.useState(null)
  const [activeStep, setActiveStep] = React.useState(0);

  const [modalNewActive, setModalNewActive] = React.useState(false)
  const [modalChangeActive, setModalChangeActive] = React.useState(false)


  React.useEffect(() => {
    window.localStorage.setItem('runData', JSON.stringify(runData));
  },[runData, activeStep])


  function updateRunData(uid, dataSection, dataKey, newValue) {
    const updatedRunData = runData.map(run => {
      if (run.uid === uid) {
        //A new object should be created and returned here, but this is working for the time being
        run[dataSection][dataKey] = newValue
        return run
      }
      return run
    })
    setRunData(updatedRunData);
  }

  function deleteRun(uid) {
    const updatedRunData = runData.filter(run => uid !== run.uid)
    setRunData(updatedRunData);
  }

  function setCurrentRun(uid, activeStep) {
    setCurrentRunUid(uid)
    setActiveStep(activeStep)
  }

  function handleAddClick(e) {
    e.preventDefault();

    setModalNewActive(true)
  }


  return (
    <main className="app-wrap">
      <section>
        <RunList
          runData={runData}
          setRunData={setRunData}
          setCurrentRunUid={setCurrentRunUid}
          setActiveStep={setActiveStep}
          deleteRun={deleteRun}
          setCurrentRun={setCurrentRun}
        />
        <button onClick={handleAddClick}>New Run +</button>
        <RunInfoNew 
          active={modalNewActive}
          setActive={setModalNewActive}
          runData={runData}
          setRunData={setRunData}
        />
      </section>
      <section>
        <RunEditor 
          runData={runData}
          currentRunUid={currentRunUid}
          setCurrentRunUid={setCurrentRunUid}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          updateRunData={updateRunData}
          modalActive={modalChangeActive}
          setModalActive={setModalChangeActive}
        />
        <RunInfoChange 
          active={modalChangeActive}
          setActive={setModalChangeActive}
          currentRunUid={currentRunUid}
          runData={runData}
        />
      </section>
    </main>
  );
}

export default App;
