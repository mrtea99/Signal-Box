import React from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Icon from "../Icon/Icon.js";

import styles from "./UserSwitcher.module.css";

function UserSwitcher(props) {
  const activeUser = useSelector((state) => state.users.currentUser);
  const usersList = useSelector((state) => state.users.usersList);

  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <select
        type="select"
        value={activeUser}
        onChange={(e) =>
          dispatch({ type: "users/setCurrentUser", payload: e.target.value })
        }
        className={styles.select}
      >
        {usersList.map((user) => (
          <option key={user.id} value={user.id}>
            {user.title}
          </option>
        ))}
      </select>
      <div className={styles.iconWrapper}>
        <Icon name="user" className={styles.icon}></Icon>
      </div>
    </div>
    // <div className={styles.main}>
    //   <select
    //     type="select"
    //     value={props.activeUser}
    //     onChange={(e) => props.setActiveUser(e.target.value)}
    //     className={styles.select}
    //   >
    //     <option value="1">Jesus Sandoval</option>
    //     <option value="2">Amanda Kezios</option>
    //   </select>
    //   <div className={styles.iconWrapper}>
    //     <Icon name="user" className={styles.icon}></Icon>
    //   </div>
    // </div>
  );
}

// UserSwitcher.propTypes = {
// };

export default UserSwitcher;
