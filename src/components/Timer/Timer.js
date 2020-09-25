import React from 'react';
import TimeFormater from '../TimeFormater/TimeFormater';

function Timer(props) {
  const [startTime, setStartTime] = React.useState(new Date(props.startTime))
  const [duration, setDuration] = React.useState(getTimeDiff(startTime))

  React.useEffect(() => {
    const timerInterval = setInterval(() => {
      const diffTime = getTimeDiff(startTime)
      setDuration(diffTime)
    }, 333)

    return () => {
      clearInterval(timerInterval);
    }
  })

  function getTimeDiff(timeStart) {
    const currentTime = Date.now();
    const diffTime = ((currentTime - timeStart))

    return diffTime;
  }

  return(
    <TimeFormater rawTime={duration} />
  )
}

export default Timer;