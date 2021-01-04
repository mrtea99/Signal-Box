import React from "react";
import PropTypes from "prop-types";

function Repeater(props) {
  const [returnValue, setReturnValue] = React.useState(props.callback());

  React.useEffect(() => {
    const timerInterval = setInterval(() => {
      setReturnValue(props.callback());
    }, props.interval);

    return () => {
      clearInterval(timerInterval);
    };
  });

  return returnValue;
}

Repeater.propTypes = {
  callback: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired,
};

export default Repeater;
