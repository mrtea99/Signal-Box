import React from "react";

function TabList(props) {
  return (
    <ul>
      {props.tabs.map((tabName, index) => (
        <li key={tabName}>
          <button onClick={() => props.indexCallback(index)}>{tabName}</button>
        </li>
      ))}
    </ul>
  );
}

export default TabList;
