import React from 'react';
import './App.css';

import styles from './App.module.css';

import SiteSidebar from './components/SiteSidebar/SiteSidebar.js';
import RunList from './components/RunList/RunList.js';
import RunEditor from './components/RunEditor/RunEditor.js';
import RunInfoNew from './components/RunInfoNew/RunInfoNew.js';
import RunInfoChange from './components/RunInfoChange/RunInfoChange.js';
import Button from './components/Button/Button.js';


function App() {
  const savedRunData = () => JSON.parse(window.localStorage.getItem('runData')) || []
  const savedcurrentRunUid = () => parseInt(window.localStorage.getItem('currentRunUid'), 10) || null

  const [runData, setRunData] = React.useState(savedRunData)
  const [currentRunUid, setCurrentRunUid] = React.useState(savedcurrentRunUid)

  const [modalNewActive, setModalNewActive] = React.useState(false)
  const [modalChangeActive, setModalChangeActive] = React.useState(false)

  const [sidebarActive, setSidebarActive] = React.useState(false)

  React.useEffect(() => {
    window.localStorage.setItem('runData', JSON.stringify(runData));
  },[runData])

  React.useEffect(() => {
    window.localStorage.setItem('currentRunUid', currentRunUid);
  },[currentRunUid])


  function updateRunData(uid, dataSection, dataKey, newValue) {
    const updatedRunData = runData.map(run => {
      if (run.uid === uid) {
        //A new object should be created and returned here, but this is working for the time being
        if (dataSection !== null) {
          run[dataSection][dataKey] = newValue
        }
        else {
          run[dataKey] = newValue
        }
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

  function setActiveStage(activeStage) {
    updateRunData(currentRunUid, null, 'activeStage', activeStage)
  }

  function handleAddClick(e) {
    e.preventDefault();

    setModalNewActive(true)
  }


  return (
    <div className={styles.siteContainer}>
      <header className={styles.siteHeader}>
        <Button text="Open Sidebar" clickHandler={() => setSidebarActive(true)} />
      </header>
      <div className={styles.sitePage}>
        <SiteSidebar sidebarActive={sidebarActive} setSidebarActive={setSidebarActive} />
        <main className={styles.siteContent}>
          <section>
            <menu className={styles.listControls}>
              <section className={styles.filterControls}></section>
              <section className={styles.otherControls}>
                <Button text="New Run +" clickHandler={handleAddClick} />
              </section>
            </menu>
            <RunList
              runData={runData}
              setRunData={setRunData}
              setCurrentRunUid={setCurrentRunUid}
              setActiveStage={setActiveStage}
              deleteRun={deleteRun}
            />
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
              setActiveStage={setActiveStage}
              updateRunData={updateRunData}
              modalActive={modalChangeActive}
              setModalActive={setModalChangeActive}
            />
            <RunInfoChange 
              active={modalChangeActive}
              setActive={setModalChangeActive}
              currentRunUid={currentRunUid}
              runData={runData}
              updateRunData={updateRunData}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
