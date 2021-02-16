import React from "react";
import PropTypes from "prop-types";
import TimeFormater from "../DurationFormatter/DurationFormatter";

function Timer(props) {
  const startTime = React.useState(new Date(props.startTime))[0];
  const [duration, setDuration] = React.useState(getTimeDiff(startTime));

  React.useEffect(() => {
    const timerInterval = setInterval(() => {
      const diffTime = getTimeDiff(startTime);
      setDuration(diffTime);
    }, 333);

    return () => {
      clearInterval(timerInterval);
    };
  });

  function getTimeDiff(timeStart) {
    const currentTime = Date.now();
    const diffTime = currentTime - timeStart;

    return diffTime;
  }

  return <TimeFormater rawTime={duration} ticking={true} />;
}

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
};

export default Timer;
