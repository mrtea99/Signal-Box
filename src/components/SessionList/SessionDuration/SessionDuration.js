import React from "react";
import PropTypes from "prop-types";

import DurationFormatter from "../../DurationFormatter/DurationFormatter.js";
import Timer from "../../Timer/Timer.js";

/**
 * Displays the correct duration for a session,
 * depending on if the duration has any length,
 * or if the session is still ongoing.
 */

function SessionDuration(props) {
  const { session } = props;

  return (
    <>
      {session.endTime ? (
        session.startTime === session.endTime ? (
          "-"
        ) : (
          <DurationFormatter
            rawTime={new Date(session.endTime) - new Date(session.startTime)}
          />
        )
      ) : (
        <Timer startTime={session.startTime} />
      )}
    </>
  );
}

SessionDuration.propTypes = {
  session: PropTypes.object.isRequired,
};

export default SessionDuration;
