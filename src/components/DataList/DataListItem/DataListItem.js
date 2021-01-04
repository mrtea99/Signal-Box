import React from "react";
import PropTypes from "prop-types";

function DataListItem(props) {
  const { dataKey, dataValue, ...itemProps } = props;

  return (
    <li {...itemProps}>
      <strong>{dataKey}:</strong> {dataValue}
    </li>
  );
}

DataListItem.propTypes = {
  dataKey: PropTypes.node.isRequired,
  dataValue: PropTypes.node
}

export default DataListItem;
