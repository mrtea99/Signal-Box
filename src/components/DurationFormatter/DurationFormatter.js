import React from "react";
import PropTypes from "prop-types";

import styles from "./DurationFormatter.module.css";

function DurationFormatter(props) {
  let hours = Math.floor(props.rawTime / (1000 * 60 * 60));
  let minutes = Math.floor((props.rawTime / (1000 * 60)) % 60);
  // let seconds = Math.floor((props.rawTime / 1000) % 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  // seconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <span className="duration">
      {hours}
      <span className={props.ticking ? styles.separatorTicking : ""}>:</span>
      {minutes}
      {/* :{seconds} */}
    </span>
  );
}

DurationFormatter.propTypes = {
  rawTime: PropTypes.number.isRequired,
  ticking: PropTypes.bool,
};

export default DurationFormatter;
