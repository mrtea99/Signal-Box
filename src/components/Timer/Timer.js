import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DurationFormatter from "../DurationFormatter/DurationFormatter";

function Timer(props) {
  const startTime = useState(new Date(props.startTime))[0];
  const [duration, setDuration] = useState(getTimeDiff(startTime));

  useEffect(() => {
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

  return <DurationFormatter rawTime={duration} ticking />;
}

Timer.propTypes = {
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default Timer;
