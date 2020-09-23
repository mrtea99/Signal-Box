import React from 'react';

function Timer(props) {
  const [startTime, setStartTime] = React.useState(new Date(props.startTime))
  const [duration, setDuration] = React.useState(0)

  React.useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const diffTime = ((currentTime - startTime))

      setDuration(diffTime)
    }, 333)

    return () => {
      clearInterval(timerInterval);
    }
  })

  function timeConverter() {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return(
      <>{hours}:{minutes}:{seconds}</>
    )
  }


  return(
    <p>{timeConverter()}</p>
  )
}

export default Timer;