import { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Calls a function on a set interval.
 */

function Repeater(props) {
  const [returnValue, setReturnValue] = useState(props.callback());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setReturnValue(props.callback());
    }, props.interval);

    return () => {
      clearInterval(timerInterval);
    };
  });

  return <>{returnValue}</>;
}

Repeater.propTypes = {
  callback: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired,
};

export default Repeater;
