import React from "react";
import PropTypes from "prop-types";
import FormItem from "../FormItem/FormItem.js";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function RunFilter(props) {
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
              updateFilters("showUser", value ? [props.activeUser] : []);
            }}
            checked={
              props.runFilters["showUser"] &&
              props.runFilters["showUser"].includes(props.activeUser)
            }
          />
        </form>
      </ModalControl>
    </div>
  );
}

RunFilter.propTypes = {
  activeUser: PropTypes.string.isRequired,
  runFilters: PropTypes.object.isRequired,
  setRunFilters: PropTypes.func.isRequired,
};

export default RunFilter;
