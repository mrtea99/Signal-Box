import React, { useContext } from "react";
import PropTypes from "prop-types";

import styles from "./DateTimeFormatter.module.css";

import TimeFormatContext from "../../contexts/TimeFormatContext.js";
import DateFormatContext from "../../contexts/DateFormatContext.js";

import { useTranslation } from "react-i18next";

/**
 * Displays a date and time in the format decided by site context.
 */

function DateTimeFormatter(props) {
  const { t } = useTranslation();

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
          afterWords = " am";
        } else {
          afterWords = " pm";
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

  const formatDay = function (time) {
    const dayNames = [
      t("Sunday"),
      t("Monday"),
      t("Tuesday"),
      t("Wednesday"),
      t("Thursday"),
      t("Friday"),
      t("Saturday"),
    ];
    const dayNumber = new Date(time).getDay();

    return dayNames[dayNumber];
  };

  const formatRelative = function (time) {
    const timeNow = new Date();

    const dayTime = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate()
    );

    const dayToday = new Date(
      timeNow.getFullYear(),
      timeNow.getMonth(),
      timeNow.getDate()
    );

    const dayTomorrow = new Date(
      timeNow.getFullYear(),
      timeNow.getMonth(),
      timeNow.getDate() + 1
    );

    if (dayTime.getTime() === dayToday.getTime()) {
      return "Today";
    }

    if (dayTime.getTime() === dayTomorrow.getTime()) {
      return "Tomorrow";
    }

    return undefined;
  };

  return (
    <time dateTime={new Date(props.date).toISOString()}>
      {props.showRelative && formatRelative(props.date) ? (
        <>
          <span className={styles.day}>{formatRelative(props.date)}</span>
          <>{props.splitLines ? <br /> : " - "}</>
        </>
      ) : null}
      {props.showDay ? (
        <>
          <span className={styles.day}>{formatDay(props.date)}</span>
          <>{props.splitLines ? <br /> : " - "}</>
        </>
      ) : null}
      <span className={styles.date}>{formatDate(props.date)}</span>
      {!props.hideTime ? (
        <>
          <>{props.splitLines ? <br /> : " "}</>
          <span className={styles.time}>{formatTime(props.date)}</span>
        </>
      ) : null}
    </time>
  );
}

export default DateTimeFormatter;

DateTimeFormatter.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  hideTime: PropTypes.bool,
  splitLines: PropTypes.bool,
  showDay: PropTypes.bool,
  showRelative: PropTypes.bool,
};
