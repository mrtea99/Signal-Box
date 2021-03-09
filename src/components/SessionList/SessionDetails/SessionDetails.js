import React from "react";
import PropTypes from "prop-types";

import DateTimeFormatter from "../../DateTimeFormatter/DateTimeFormatter.js";
import SessionDuration from "../../SessionList/SessionDuration/SessionDuration.js";
import DataList from "../../DataList/DataList.js";
import DataListItem from "../../DataList/DataListItem/DataListItem.js";

import getItemType from "../../../utils/getItemType.js";
import getSessionName from "../../../utils/getSessionName.js";

function SessionDetails(props) {
  const { session, thisStage } = props;
  const itemName = getItemType(thisStage);

  const capitalise = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getUserKey = (session) => {
    switch (session.type) {
      case "work":
      case "consign":
        return "Technician";
      case "qa":
        return "Requester";
      case "flag":
        return "Reporter";
      case "assign":
        return "Assigned by";
      default:
        return "User";
    }
  };

  const getSecondaryUserKey = (session) => {
    switch (session.type) {
      case "work":
        return "Assitor";
      case "qa":
        return "Checker";
      case "flag":
        return "Assigned to";
      case "assign":
        return "Assigned to";
      default:
        return "User";
    }
  };

  const getStatus = (session) => {
    switch (session.type) {
      case "work":
        return session.endTime ? "Resolved" : "Unresolved";
      case "qa":
      case "assign":
        return session.endTime ? "Resolved" : "Active";
      case "flag":
        return capitalise(session.extra);
      case "consign":
        return "Complete";
      default:
        return "N/A";
    }
  };

  return (
    <>
      <DataList>
        {/* Activity */}
        <DataListItem dataKey="Activity" dataValue={getSessionName(session)} />

        {/* ID */}
        <DataListItem dataKey="ID" dataValue={session.sessionId} />

        {/* Session Status */}
        <DataListItem dataKey="Status" dataValue={getStatus(session)} />

        {/* Time / Duration */}
        {session.startTime === session.endTime ? (
          <DataListItem
            dataKey="Time"
            dataValue={<DateTimeFormatter date={session.startTime} />}
          />
        ) : (
          <>
            <DataListItem
              dataKey="Start Time"
              dataValue={<DateTimeFormatter date={session.startTime} />}
            />
            {session.endTime ? (
              <DataListItem
                dataKey="End Time"
                dataValue={<DateTimeFormatter date={session.endTime} />}
              />
            ) : null}
            <DataListItem
              dataKey="Duration"
              dataValue={<SessionDuration session={session} />}
            />
          </>
        )}

        {/* Users */}
        <DataListItem dataKey={getUserKey(session)} dataValue={session.user} />
        {session.secondaryUser ? (
          <DataListItem
            dataKey={getSecondaryUserKey(session)}
            dataValue={session.secondaryUser}
          />
        ) : null}

        {/* Unit amounts */}
        {session.type === "work" ||
        (session.type === "qa" && session.endTime) ? (
          <>
            <DataListItem
              dataKey={itemName}
              dataValue={session.amount || "-"}
            />
            <DataListItem
              dataKey="Defective"
              dataValue={session.amountBad || "-"}
            />
          </>
        ) : null}

        {/* Notes */}
        {session.notes && session.notes.length ? (
          <DataListItem
            newLine
            dataKey="Notes"
            dataValue={session.notes.split("\n").map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          />
        ) : null}

        {/* Extra */}
        {session.type === "qa" ? (
          <DataListItem dataKey="Timeframe" dataValue={session.extra} />
        ) : null}
      </DataList>
    </>
  );
}

SessionDetails.propTypes = {
  session: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
};

export default SessionDetails;
