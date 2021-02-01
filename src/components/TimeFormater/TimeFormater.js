import React from "react";
import PropTypes from "prop-types";

function TimeFormater(props) {
  let seconds = Math.floor((props.rawTime / 1000) % 60);
  let minutes = Math.floor((props.rawTime / (1000 * 60)) % 60);
  let hours = Math.floor(props.rawTime / (1000 * 60 * 60));

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <>
      {hours}:{minutes}
      {/* :{seconds} */}
    </>
  );
}

TimeFormater.propTypes = {
  rawTime: PropTypes.number.isRequired,
};

export default TimeFormater;
