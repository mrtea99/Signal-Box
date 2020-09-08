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

  function handleNavigation(dir, e) {
    e.preventDefault()

    if (dir !== -1 && dir < stageNameArr.length) {
      setActiveStage(dir)
      props.updateRunData(props.currentRunUid, null, 'activeStage', dir)
    }
  }

  return (
    <>
      {stageNameArr.map((stage, index) => 
        <Stage 
          key={stage}
          thisStage={index}
          stageName={stage}
          activeStage={activeStage}
          thisRunData={props.thisRunData}
          currentRunUid={props.currentRunUid}
          updateRunData={props.updateRunData}
        />
      )}
      
      { activeStage > 0 ?
        <button onClick={(e) => handleNavigation(activeStage - 1, e)}>Previous Stage</button>
      : <></> }
      { activeStage < stageNameArr.length - 1 ?
        <button onClick={(e) => handleNavigation(activeStage + 1, e)}>Next Stage</button>
      : <></> }
    </>
  )
}

export default StageControl;