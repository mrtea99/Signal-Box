import React from "react";

import TabList from "./TabList/TabList.js";

function TabBox(props) {
  const [selectedBox, setSelectedBox] = React.useState(0);

  return (
    <div>
      <nav>
        <TabList
          tabs={props.boxes.map((box, index) => box.label)}
          indexCallback={setSelectedBox}
        />
      </nav>
      <div>{props.boxes[selectedBox].content}</div>
    </div>
  );
}

export default TabBox;
