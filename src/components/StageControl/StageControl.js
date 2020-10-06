import React from "react";

import Stage from "../Stage/Stage.js";
import StageNav from "../StageNav/StageNav.js";

// import styles from './StageControl.module.css';

function StageControl(props) {
  // const [activeStage, setActiveStage] = React.useState(() => {
  //   if (props.thisRunData !== undefined) {
  //     return props.thisRunData.activeStage;
  //   } else {
  //     return 0;
  //   }
  // });

  const [adjustedActiveStage, setAdjustedActiveStage] = React.useState(() => {
    if (props.activeStage === 1) {
      if (
        props.thisRunData.activeStage === 0 ||
        props.thisRunData.activeStage === 1 ||
        props.thisRunData.activeStage === 2
      ) {
        return props.thisRunData.activeStage;
      } else {
        return props.activeStage;
      }
    } else {
      return props.activeStage;
    }
  });

  function updateActiveStage(stageNum) {
    setAdjustedActiveStage(stageNum);
    props.setActiveStage(stageNum);
    if (stageNum === 0 || stageNum === 1 || stageNum === 2) {
      props.updateRunData(props.currentRunUid, null, "activeStage", stageNum);
    }
  }

  // React.useEffect(() => {
  //   const newRunData = props.runData.find(
  //     (obj) => obj.uid === props.currentRunUid
  //   );

  //   if (newRunData !== undefined) {
  //     setActiveStage(newRunData.activeStage);
  //   } else {
  //     setActiveStage(null);
  //   }
  // }, [props.runData, props.currentRunUid]);

  const stageNameArr = [
    "Preparation",
    "Manufacturing",
    "Cooling",
    "Packaging",
    "Labeling",
  ];

  return (
    <>
      <StageNav
        stageNameArr={stageNameArr}
        currentRunUid={props.currentRunUid}
        activeStage={adjustedActiveStage}
        setActiveStage={updateActiveStage}
        updateRunData={props.updateRunData}
        thisRunData={props.thisRunData}
      />

      {stageNameArr.map((stage, index) => (
        <Stage
          key={props.currentRunUid + stage}
          thisStage={index}
          stageName={stage}
          activeStage={adjustedActiveStage}
          thisRunData={props.thisRunData}
          currentRunUid={props.currentRunUid}
          updateRunData={props.updateRunData}
          activeUser={props.activeUser}
        />
      ))}
    </>
  );
}

export default StageControl;
