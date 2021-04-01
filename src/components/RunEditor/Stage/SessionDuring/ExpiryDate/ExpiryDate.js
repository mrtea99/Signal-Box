import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import {
  selectStageSessions,
  selectRun,
} from "../../../../RunList/runsSlice.js";

const ExpiryDate = function (props) {
  const expiryDuration = useSelector((state) =>
    selectRun(state, props.currentRunUid)
  ).productInfo.expirationDuration;

  const expiryStart = useSelector((state) =>
    selectStageSessions(state, props.currentRunUid, 1)
  )[0].startTime;

  const expiryCalc = function (start, months) {
    const startDate = new Date(start);
    const expiryDate = new Date(
      startDate.setMonth(startDate.getMonth() + 1 + months)
    );

    return expiryDate.getTime();
  };

  return <>{expiryCalc(expiryStart, expiryDuration)}</>;
};

ExpiryDate.propTypes = {
  currentRunUid: PropTypes.number.isRequired,
};

export default ExpiryDate;
