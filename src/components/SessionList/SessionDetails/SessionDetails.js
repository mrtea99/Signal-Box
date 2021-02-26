import React from "react";
import PropTypes from "prop-types";

import DateTimeFormatter from "../../DateTimeFormatter/DateTimeFormatter.js";
import SessionDuration from "../../SessionList/SessionDuration/SessionDuration.js";

import getItemType from "../../../utils/getItemType.js";
import getSessionName from "../../../utils/getSessionName.js";

function SessionDetails(props) {
  const { session, thisStage } = props;
  const itemName = getItemType(thisStage);

  return (
    <>
      <h3>{getSessionName(session)}</h3>
      <p>Session ID: {session.sessionId}</p>
      <p>Resolved: {session.endTime ? "Resolved" : "Unresolved"}</p>
      <p>
        Start Time: <DateTimeFormatter date={session.startTime} />
      </p>
      {session.endTime ? (
        <p>
          End Time: <DateTimeFormatter date={session.endTime} />
        </p>
      ) : null}
      <p>
        Duration: <SessionDuration session={session} />
      </p>
      <p>Technician: {session.user}</p>
      <p>
        {itemName}: {session.amount}
      </p>
      <p>Defective: {session.amountBad}</p>
      {session.notes && session.notes.length ? (
        <p>
          Notes:
          <br />
          {session.notes.split("\n").map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </p>
      ) : null}
      {session.type === "qa" ? (
        <>
          <p>Checker: {session.secondaryUser}</p>
          <p>Timeframe: {session.extra}</p>
        </>
      ) : null}
    </>
  );
}

SessionDetails.propTypes = {
  session: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default SessionDetails;
