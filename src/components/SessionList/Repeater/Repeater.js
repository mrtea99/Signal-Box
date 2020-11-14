import React from "react";

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

export default Repeater;
