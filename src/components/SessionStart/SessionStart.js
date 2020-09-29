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
  const [roomTemp, setRoomTemp] = React.useState(null)
  
  // Room humidity (manu and cool)
  const [roomHumidity, setRoomHumidity] = React.useState(null)
  
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

  function validateForm() {
    if(props.thisStage === 1 || props.thisStage === 2) {
      if (typeof roomTemp === 'number' && roomTemp >= 0 && roomTemp <= 120 && typeof roomHumidity === 'number' && roomHumidity >= 0 && roomHumidity <= 100) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
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
        <>
          <div>
            <label htmlFor="sess-temp">Room Temperature:</label>
            <input id="sess-temp" type="number" onChange={(e) => setRoomTemp(parseInt(e.target.value))} min="0" max="120"/>
          </div>
          <div>
            <label htmlFor="sess-humidity">Room Humidity:</label>
            <input id="sess-humidity" type="number" onChange={(e) => setRoomHumidity(parseInt(e.target.value))} min="0" max="100"/>
          </div>
        </>
      : <></> }
      <button onClick={handleNewClick} disabled={!validateForm()} >Start New Session</button>
    </form>
  )
}

export default SessionStart;