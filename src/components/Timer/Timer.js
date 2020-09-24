import React from 'react';

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

  function timeConverter(rawTime) {
    let seconds = Math.floor((rawTime / 1000) % 60);
    let minutes = Math.floor((rawTime / (1000 * 60)) % 60);
    let hours = Math.floor((rawTime / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return(
      <>{hours}:{minutes}:{seconds}</>
    )
  }

  return(
    <p>{timeConverter(duration)}</p>
  )
}

export default Timer;