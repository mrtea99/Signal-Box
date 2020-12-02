import React from "react";

import { ReactComponent as Play } from "./play.svg";
import { ReactComponent as Stop } from "./stop.svg";
import { ReactComponent as Checkmark } from "./checkmark.svg";
import { ReactComponent as Cross } from "./cross.svg";
import { ReactComponent as Bookmark } from "./bookmark.svg";
import { ReactComponent as Warning } from "./warning.svg";
import { ReactComponent as Notification } from "./notification.svg";
import { ReactComponent as ArrowRight } from "./arrow-right.svg";
import { ReactComponent as ArrowLeft } from "./arrow-left.svg";
import { ReactComponent as Search } from "./search.svg";
import { ReactComponent as Wrench } from "./wrench.svg";
import { ReactComponent as FileText } from "./file-text.svg";
import { ReactComponent as Profile } from "./profile.svg";
import { ReactComponent as Plus } from "./plus.svg";
import { ReactComponent as Minus } from "./minus.svg";
import { ReactComponent as User } from "./user.svg";
import { ReactComponent as Cog } from "./cog.svg";
import { ReactComponent as Menu } from "./menu.svg";

function Icon(props) {
  const iconElem = function () {
    switch (props.name) {
      case "start":
        return <Play className={props.className} />;
      case "stop":
        return <Stop className={props.className} />;
      case "tick":
        return <Checkmark className={props.className} />;
      case "cross":
        return <Cross className={props.className} />;
      case "qa":
        return <Bookmark className={props.className} />;
      case "issue":
        return <Warning className={props.className} />;
      case "blocker":
        return <Notification className={props.className} />;
      case "next":
        return <ArrowRight className={props.className} />;
      case "previous":
        return <ArrowLeft className={props.className} />;
      case "check":
        return <Search className={props.className} />;
      case "fix":
        return <Wrench className={props.className} />;
      case "details":
        return <FileText className={props.className} />;
      case "detailsAlt":
        return <Profile className={props.className} />;
      case "plus":
        return <Plus className={props.className} />;
      case "minus":
        return <Minus className={props.className} />;
      case "user":
        return <User className={props.className} />;
      case "settings":
        return <Cog className={props.className} />;
      case "menu":
        return <Menu className={props.className} />;
      default:
        return null;
    }
  };

  return <>{iconElem()}</>;
}

export default Icon;
