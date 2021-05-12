import React from "react";
import PropTypes from "prop-types";

import DateTimeFormatter from "../../DateTimeFormatter/DateTimeFormatter.js";
import SessionDuration from "../../SessionList/SessionDuration/SessionDuration.js";
import DataList from "../../DataList/DataList.js";
import DataListItem from "../../DataList/DataListItem/DataListItem.js";
import UserName from "../../UserSwitcher/UserName/UserName.js";

import getItemType from "../../../utils/getItemType.js";
import getSessionName from "../../../utils/getSessionName.js";

import { useTranslation } from "react-i18next";

/**
 * Displays all the information stored in a session,
 * formatted to be user readable.
 */

function SessionDetails(props) {
  const { t } = useTranslation();

  const { session } = props;
  const itemName = getItemType(session.stage);

  const capitalise = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getUserKey = (session) => {
    switch (session.type) {
      case "work":
      case "consign":
        return t("Technician");
      case "qa":
        return t("Requester");
      case "flag":
        return t("Reporter");
      case "assign":
        return t("Assigned by");
      default:
        return t("User");
    }
  };

  const getSecondaryUserKey = (session) => {
    switch (session.type) {
      case "work":
        return t("Assitor");
      case "qa":
        return t("Checker");
      case "flag":
      case "assign":
        return t("Assigned to");
      default:
        return t("User");
    }
  };

  const getStatus = (session) => {
    switch (session.type) {
      case "work":
        return session.endTime ? t("Resolved") : t("Unresolved");
      case "qa":
      case "assign":
        return session.endTime ? t("Resolved") : t("Active");
      case "flag":
        return capitalise(session.extra);
      case "consign":
        return t("Complete");
      default:
        return t("N/A");
    }
  };

  return (
    <>
      <DataList>
        {/* Activity */}
        <DataListItem
          dataKey={t("Activity")}
          dataValue={getSessionName(session)}
        />

        {/* ID */}
        <DataListItem dataKey={t("ID")} dataValue={session.sessionId} />

        {/* Session Status */}
        <DataListItem dataKey={t("Status")} dataValue={getStatus(session)} />

        {/* Time / Duration */}
        {session.startTime === session.endTime ? (
          <DataListItem
            dataKey={t("Time")}
            dataValue={<DateTimeFormatter date={session.startTime} />}
          />
        ) : (
          <>
            <DataListItem
              dataKey={t("Start Time")}
              dataValue={<DateTimeFormatter date={session.startTime} />}
            />
            {session.endTime ? (
              <DataListItem
                dataKey={t("End Time")}
                dataValue={<DateTimeFormatter date={session.endTime} />}
              />
            ) : null}
            <DataListItem
              dataKey={t("Duration")}
              dataValue={<SessionDuration session={session} />}
            />
          </>
        )}

        {/* Users */}
        <DataListItem
          dataKey={getUserKey(session)}
          dataValue={<UserName userId={session.user} />}
        />
        {session.secondaryUser ? (
          <DataListItem
            dataKey={getSecondaryUserKey(session)}
            dataValue={<UserName userId={session.secondaryUser} />}
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
              dataKey={t("Defective")}
              dataValue={session.amountBad || "-"}
            />
          </>
        ) : null}

        {/* Notes */}
        {session.notes && session.notes.length ? (
          <DataListItem
            newLine
            dataKey={t("Notes")}
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
      </DataList>
    </>
  );
}

SessionDetails.propTypes = {
  session: PropTypes.object.isRequired,
};

export default SessionDetails;
