import React from 'react';

import Stage from '../Stage/Stage.js';
import StageNav from '../StageNav/StageNav.js';

// import styles from './StageControl.module.css';

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

  return (
    <>
      <StageNav 
        stageNameArr={stageNameArr}
        currentRunUid={props.currentRunUid}
        activeStage={activeStage}
        setActiveStage={setActiveStage}
        updateRunData={props.updateRunData}
        thisRunData={props.thisRunData}
      />

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
    </>
  )
}

export default StageControl;