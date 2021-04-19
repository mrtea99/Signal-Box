import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { selectRun } from "../../../../RunList/runsSlice.js";
import { selectStageSessions } from "../../../../SessionList/sessionsSlice.js";

/**
 * Calculates the correct expiry date for a product based on the runId,
 * using the start date of the first manufacturing session.
 */

const ExpiryDate = function (props) {
  const expiryDuration = useSelector((state) =>
    selectRun(state, props.currentRunId)
  ).productInfo.expirationDuration;

  const expiryStart = useSelector((state) =>
    selectStageSessions(state, props.currentRunId, 1)
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
  currentRunId: PropTypes.number.isRequired,
};

export default ExpiryDate;
