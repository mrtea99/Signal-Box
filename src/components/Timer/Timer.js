import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DurationFormatter from "../DurationFormatter/DurationFormatter";

function Timer(props) {
  const getTimeDiff = function (timeStart) {
    const diffTime = Date.now() - new Date(timeStart);

    return diffTime;
  };

  const [duration, setDuration] = useState(getTimeDiff(props.startTime));

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const diffTime = getTimeDiff(props.startTime);
      setDuration(diffTime);
    }, 333);

    return () => {
      clearInterval(timerInterval);
    };
  }, [props.startTime]);

  return <DurationFormatter rawTime={duration} ticking />;
}

Timer.propTypes = {
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default Timer;
