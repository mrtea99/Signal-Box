import React from "react";
import PropTypes from "prop-types";

import styles from "./DurationFormatter.module.css";

/**
 * Displays a duration in hours and mins, converted from javascript time.
 * Can optionaly show a flashing separator to indicate an active state.
 */

function DurationFormatter(props) {
  //todo add site setting to toggle seconds display
  const showSeconds = false;

  let duraton = props.rawTime;

  const negativeTime = duraton < 0;
  if (negativeTime) {
    duraton = Math.abs(duraton);
  }

  //Add one minute to duration to stop timer being 00:00 for first minute
  if (!showSeconds) {
    duraton = duraton + 60000;
  }

  let hours = Math.floor(duraton / (1000 * 60 * 60));
  let minutes = Math.floor((duraton / (1000 * 60)) % 60);
  let seconds = Math.floor((duraton / 1000) % 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const tickingSeparator = (
    <span className={props.ticking ? styles.separatorTicking : ""}>:</span>
  );

  return (
    <span className="duration">
      {negativeTime ? "-" : null}
      {hours}
      {tickingSeparator}
      {minutes}
      {showSeconds ? (
        <>
          {tickingSeparator}
          {seconds}
        </>
      ) : null}
    </span>
  );
}

DurationFormatter.propTypes = {
  rawTime: PropTypes.number.isRequired,
  ticking: PropTypes.bool,
};

export default DurationFormatter;
