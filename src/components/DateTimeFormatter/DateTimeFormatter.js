import React, { useContext } from "react";
import PropTypes from "prop-types";

import styles from "./DateTimeFormatter.module.css";

import TimeFormatContext from "../../contexts/TimeFormatContext.js";
import DateFormatContext from "../../contexts/DateFormatContext.js";

function DateTimeFormatter(props) {
  const timeFormat = useContext(TimeFormatContext);
  const dateFormat = useContext(DateFormatContext);

  const addLeadingZero = function (number) {
    if (number < 10) {
      number = "0" + number;
    }
    return number;
  };

  const formatDate = function (time) {
    const dateObj = new Date(time);

    const fullYear = dateObj.getFullYear();
    const shortYear = fullYear.toString().slice(-2);
    const month = addLeadingZero(dateObj.getMonth() + 1);
    const day = addLeadingZero(dateObj.getDate());

    let dateString;
    switch (dateFormat) {
      default:
      case "ymd":
        dateString = `${fullYear}-${month}-${day}`;
        break;
      case "mdy":
        dateString = `${month}/${day}/${shortYear}`;
        break;
    }

    return dateString;
  };

  const formatTime = function (time) {
    const dateObj = new Date(time);

    const dateHours = dateObj.getHours();
    let hour;
    let afterWords = "";

    switch (timeFormat) {
      default:
      case "24h":
        hour = addLeadingZero(dateHours);
        break;
      case "12h":
        if (dateHours < 12) {
          afterWords = "am";
        } else {
          afterWords = "pm";
        }

        if (dateHours > 12) {
          hour = dateHours - 12;
        } else {
          hour = dateHours;
        }

        if (dateHours === 0) {
          hour = 12;
        }
        break;
    }

    const min = addLeadingZero(dateObj.getMinutes());
    // const sec = addLeadingZero(dateObj.getSeconds());

    // return `${hour}:${min}:${sec}${afterWords}`;
    return `${hour}:${min}${afterWords}`;

  };

  return (
    <time dateTime={new Date(props.date).toISOString()}>
      <span className={styles.date}>{formatDate(props.date)}</span>
      {props.splitLines ? <br /> : " "}
      <span className={styles.time}>{formatTime(props.date)}</span>
    </time>
  );
}

export default DateTimeFormatter;

DateTimeFormatter.propTypes = {
  date: PropTypes.number.isRequired,
  splitLines: PropTypes.bool,
};
