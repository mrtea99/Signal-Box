import React from 'react';


const activityList = [
  [
    'Manufacturing',
    'Packaging'
  ],
  [
    'Manufacturing and Pouring',
    'Create Blend',
    'Create Base',
    'Manufacturing',
    'Pouring'
  ],
  [
    'Unsupervised',
    'Supervised',
    'Finishing Touches'
  ],
  [
    'Packaging',
  ],
  [
    'Labeling',
    'Sealing',
    'Boxing'
  ],
]

function SessionStart(props) {
  // Activity type (all)
  const [activityData, setActivityData] = React.useState(activityList[props.thisStage][0]);
  
  // Room temp (manu and cool)
  const [roomTemp, setRoomTemp] = React.useState(0)
  
  // Room humidity (manu and cool)
  
  function handleNewClick(e) {
    e.preventDefault();

    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      startTime: Date.now(),
      activity: activityData
    }

    if(props.thisStage === 1 || props.thisStage === 2) {
      newSession.roomTemp = roomTemp;
    }

    props.addSession(newSession, newSessionUid)
  }

  return(
    <form>
      <div>
        <label htmlFor={"sess-activity-step-" + props.thisStage}>Activity:</label>
        <select id={"sess-activity-step-" + props.thisStage} onChange={(e) => setActivityData(e.target.value)} value={activityData}>
          {activityList[props.thisStage].map((activityType, index) => 
            <option key={'activity-' + index + '-stage-' + props.thisStage} value={activityType}>{activityType}</option>
          )}
        </select>
      </div>
      {props.thisStage === 1 || props.thisStage === 2 ?  
        <div>
          <label htmlFor="sess-temp">Room Temperature:</label>
          <input id="sess-temp" type="text" onChange={(e) => setRoomTemp(e.target.value)} value={roomTemp} />
        </div>
      : <></> }
      <button onClick={handleNewClick}>Start New Session</button>
    </form>
  )
}

export default SessionStart;