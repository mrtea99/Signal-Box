import React from "react";

function DataList(props) {
  return <ul {...props}>{props.children}</ul>;
}

export default DataList;
