import React from "react";
import PropTypes from "prop-types";

function DataList(props) {
  return <ul {...props}>{props.children}</ul>;
}

DataList.propTypes = {
  children: PropTypes.node,
};

export default DataList;
