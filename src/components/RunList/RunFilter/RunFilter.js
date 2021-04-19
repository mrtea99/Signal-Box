import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import FormItem from "../../FormItem/FormItem.js";
import ModalControl from "../../Modal/ModalControl/ModalControl.js";

import { selectCurrentUser } from "../../UserSwitcher/usersSlice.js";

import { useTranslation } from "react-i18next";

/**
 * Dialog to let user edit current filters for the runlist
 */

function RunFilter(props) {
  const { t } = useTranslation();

  const activeUser = useSelector(selectCurrentUser);

  const updateFilters = function (filterKey, filterValue) {
    let newFilters = { ...props.runFilters };
    newFilters[filterKey] = filterValue;

    props.setRunFilters(newFilters);
  };

  return (
    <div>
      <ModalControl
        title={t("Filter Runs")}
        triggerCopy={t("Filter")}
        buttonAttrs={{ icon: "filter" }}
      >
        <h3>{t("Show runs with")}:</h3>
        <form>
          <FormItem
            label={t("Unresolved QA Sessions")}
            type="checkbox"
            ident="filter-qa"
            updateHandler={(value) => {
              updateFilters("showUnresolvedQa", value);
            }}
            checked={props.runFilters["showUnresolvedQa"]}
          />
          <FormItem
            label={t("Work by you")}
            type="checkbox"
            ident="filter-user"
            updateHandler={(value) => {
              updateFilters("showUser", value ? [activeUser] : []);
            }}
            checked={
              props.runFilters["showUser"] &&
              props.runFilters["showUser"].includes(activeUser)
            }
          />
        </form>
      </ModalControl>
    </div>
  );
}

RunFilter.propTypes = {
  runFilters: PropTypes.object.isRequired,
  setRunFilters: PropTypes.func.isRequired,
};

export default RunFilter;
