import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DurationFormatter from "../DurationFormatter/DurationFormatter";

function Timer(props) {
  const startTime = new Date(props.startTime);

  const [duration, setDuration] = useState(getTimeDiff(startTime));

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const diffTime = getTimeDiff(startTime);
      setDuration(diffTime);
    }, 333);

    return () => {
      clearInterval(timerInterval);
    };
  }, [startTime]);

  function getTimeDiff(timeStart) {
    const diffTime = Date.now() - timeStart;

    return diffTime;
  }

  return <DurationFormatter rawTime={duration} ticking />;
}

Timer.propTypes = {
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default Timer;
