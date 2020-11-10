import React from "react";

import { ReactComponent as Checkmark } from "./checkmark.svg";
import { ReactComponent as Bookmark } from "./bookmark.svg";


function Icon(props) {
  const iconElem = function () {
    switch (props.name) {
      case "tick":
        return <Checkmark className={props.className} />;
      case "qa":
        return <Bookmark className={props.className} />;
      default:
        return <></>;
    }
  };

  return <>{iconElem()}</>;
}

export default Icon;
