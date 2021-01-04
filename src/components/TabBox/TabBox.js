import React from "react";
import PropTypes from "prop-types";

import TabList from "./TabList/TabList.js";

function TabBox(props) {
  const [selectedBox, setSelectedBox] = React.useState(0);

  return (
    <div>
      <nav>
        <TabList
          tabs={props.boxes.map((box, index) => box.label)}
          indexCallback={setSelectedBox}
          activeTab={selectedBox}
        />
      </nav>
      <div>{props.boxes[selectedBox].content}</div>
    </div>
  );
}

TabBox.propTypes = {
  boxes: PropTypes.array.isRequired,
};

export default TabBox;
