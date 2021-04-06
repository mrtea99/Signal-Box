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
          indexCallback={props.changeActiveBox || setSelectedBox}
          activeTab={props.activeBox || selectedBox}
        />
      </nav>
      <div>{props.boxes[props.activeBox || selectedBox].content}</div>
    </div>
  );
}

TabBox.propTypes = {
  activeBox: PropTypes.number,
  changeActiveBox: PropTypes.func,
  boxes: PropTypes.array.isRequired,
};

export default TabBox;
