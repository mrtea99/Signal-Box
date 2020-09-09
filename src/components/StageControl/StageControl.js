import React from 'react';
import Stage from '../Stage/Stage.js';

function StageControl(props) {
  const [activeStage, setActiveStage] = React.useState(() => {
    if (props.thisRunData !== undefined) {
      return props.thisRunData.activeStage
    }
    else {
      return 0
    }
  });

  React.useEffect(() => {
    const newRunData = props.runData.find(obj => obj.uid === props.currentRunUid)

    if (newRunData !== undefined) {
      setActiveStage(newRunData.activeStage)
    }
    else {
      setActiveStage(null)
    }
  }, [props.runData, props.currentRunUid]);

  const stageNameArr = ['Preparation', 'Manufacturing', 'Cooling', 'Packaging', 'Labeling']

  function stageChange(newStageIndex) {
    setActiveStage(newStageIndex)
    props.updateRunData(props.currentRunUid, null, 'activeStage', newStageIndex)
  }

  // function handleNavigation(dir, e) {
  //   e.preventDefault()

  //   if (dir !== -1 && dir < stageNameArr.length) {
  //     stageChange(dir)
  //   }
  // }

  function handleNavList(stageIndex, e) {
    e.preventDefault()

    stageChange(stageIndex)
  }

  return (
    <>

      <ul>
        {stageNameArr.map((stage, index) => 
          <li key={props.currentRunUid + stage}>
            <button style={ {opacity: activeStage === index ? 1 : 0.8} } onClick={(e) => handleNavList(index, e)}>{stage}</button>
          </li>
        )}
      </ul>

      {stageNameArr.map((stage, index) => 
        <Stage 
          key={props.currentRunUid + stage}
          thisStage={index}
          stageName={stage}
          activeStage={activeStage}
          thisRunData={props.thisRunData}
          currentRunUid={props.currentRunUid}
          updateRunData={props.updateRunData}
        />
      )}
      
      {/* { activeStage > 0 ?
        <button onClick={(e) => handleNavigation(activeStage - 1, e)}>Previous Stage</button>
      : <></> }
      { activeStage < stageNameArr.length - 1 ?
        <button onClick={(e) => handleNavigation(activeStage + 1, e)}>Next Stage</button>
      : <></> } */}
    </>
  )
}

export default StageControl;