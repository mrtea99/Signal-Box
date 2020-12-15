import React from "react";

function DataListItem(props) {
  const { dataKey, dataValue, ...itemProps } = props;

  return (
    <li {...itemProps}>
      <strong>{dataKey}:</strong> {dataValue}
    </li>
  );
}

export default DataListItem;
