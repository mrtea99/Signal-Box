import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import FormItem from "../FormItem/FormItem.js";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function RunFilter(props) {
  const activeUser = useSelector((state) => state.users.currentUser);

  const updateFilters = function (filterKey, filterValue) {
    let newFilters = { ...props.runFilters };
    newFilters[filterKey] = filterValue;

    props.setRunFilters(newFilters);
  };

  return (
    <div>
      <ModalControl
        title="Filter Runs"
        triggerCopy={"Filter"}
        buttonAttrs={{ icon: "filter" }}
      >
        <h3>Show runs with:</h3>
        <form>
          <FormItem
            label="Unresolved QA Sessions"
            type="checkbox"
            ident="filter-qa"
            updateHandler={(value) => {
              updateFilters("showUnresolvedQa", value);
            }}
            checked={props.runFilters["showUnresolvedQa"]}
          />
          <FormItem
            label="Work by you"
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
