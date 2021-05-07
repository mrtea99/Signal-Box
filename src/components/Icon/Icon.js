import React from "react";
import PropTypes from "prop-types";

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
import { ReactComponent as Filter } from "./filter.svg";
import { ReactComponent as StarFull } from "./star-full.svg";
import { ReactComponent as PieChart } from "./pie-chart.svg";
import { ReactComponent as Spinner8 } from "./spinner8.svg";
import { ReactComponent as Calendar } from "./calendar.svg";

import styles from "./Icon.module.css";

/**
 * Displays an icon inline.
 */

function Icon(props) {
  let { name, className } = props;
  className = `${className} ${styles.icon}`;
  const attrs = { className };

  const iconElem = function () {
    switch (name) {
      case "start":
        return <Play {...attrs} />;
      case "stop":
        return <Stop {...attrs} />;
      case "tick":
        return <Checkmark {...attrs} />;
      case "cross":
        return <Cross {...attrs} />;
      case "qa":
        return <Bookmark {...attrs} />;
      case "note":
        return <FileText {...attrs} />;
      case "issue":
        return <Warning {...attrs} />;
      case "blocker":
        return <Notification {...attrs} />;
      case "assign":
        return <StarFull {...attrs} />;
      case "next":
        return <ArrowRight {...attrs} />;
      case "previous":
        return <ArrowLeft {...attrs} />;
      case "check":
        return <Search {...attrs} />;
      case "fix":
        return <Wrench {...attrs} />;
      case "details":
        return <FileText {...attrs} />;
      case "detailsAlt":
        return <Profile {...attrs} />;
      case "plus":
        return <Plus {...attrs} />;
      case "minus":
        return <Minus {...attrs} />;
      case "user":
        return <User {...attrs} />;
      case "progress":
        return <PieChart {...attrs} />;
      case "settings":
        return <Cog {...attrs} />;
      case "menu":
        return <Menu {...attrs} />;
      case "filter":
        return <Filter {...attrs} />;
      case "spinner":
        return <Spinner8 {...attrs} />;
      case "calendar":
        return <Calendar {...attrs} />;
      default:
        return null;
    }
  };

  return <>{iconElem()}</>;
}

Icon.propTypes = {
  /**  Name of icon */
  name: PropTypes.string.isRequired,
  /**  Classname to add to icon element */
  className: PropTypes.string,
};

export default Icon;
