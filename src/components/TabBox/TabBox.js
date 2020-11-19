import React from "react";

function TabBox(props) {
  const [selectedBox, setSelectedBox] = React.useState(0);

  return (
    <div>
      <nav>
        <ul>
          {props.boxes.map((box, index) => (
            <li key={box.label}>
              <button onClick={() => setSelectedBox(index)}>{box.label}</button>
            </li>
          ))}
        </ul>
      </nav>
      <div>{props.boxes[selectedBox].content}</div>
    </div>
  );
}

export default TabBox;
