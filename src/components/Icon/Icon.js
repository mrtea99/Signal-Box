import React from "react";

import { ReactComponent as Play } from "./play.svg";
import { ReactComponent as Stop } from "./stop.svg";
import { ReactComponent as Checkmark } from "./checkmark.svg";
import { ReactComponent as Bookmark } from "./bookmark.svg";
import { ReactComponent as Warning } from "./warning.svg";
import { ReactComponent as Notification } from "./notification.svg";
import { ReactComponent as ArrowRight } from "./arrow-right.svg";

function Icon(props) {
  const iconElem = function () {
    switch (props.name) {
      case "start":
        return <Play className={props.className} />;
      case "stop":
        return <Stop className={props.className} />;
      case "tick":
        return <Checkmark className={props.className} />;
      case "qa":
        return <Bookmark className={props.className} />;
      case "issue":
        return <Warning className={props.className} />;
      case "blocker":
        return <Notification className={props.className} />;
      case "next":
        return <ArrowRight className={props.className} />;
      default:
        return <></>;
    }
  };

  return <>{iconElem()}</>;
}

export default Icon;
