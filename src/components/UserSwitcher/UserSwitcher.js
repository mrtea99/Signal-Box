import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Icon from "../Icon/Icon.js";
import UserName from "./UserName/UserName.js";

import styles from "./UserSwitcher.module.css";

import { selectCurrentUser } from "./usersSlice.js";

/**
 * Updates the site's current user
 */

function UserSwitcher() {
  const activeUser = useSelector(selectCurrentUser);
  const usersList = useSelector((state) => state.users.usersList);

  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <Link to="/user/" className={styles.link}>
        <Icon name="user" className={styles.userIcon}></Icon>
        <UserName userId={activeUser} />
      </Link>
      <div className={styles.switcher}>
        <select
          type="select"
          value={activeUser}
          onChange={(e) =>
            dispatch({
              type: "users/setCurrentUser",
              payload: parseInt(e.target.value),
            })
          }
          className={styles.select}
        >
          {usersList.map((user) => (
            <option key={user.Id} value={user.Id}>
              {user.Title}
            </option>
          ))}
        </select>
        <div className={styles.iconWrapper}>
          <Icon name="start" className={styles.icon}></Icon>
        </div>
      </div>
    </div>
  );
}

export default UserSwitcher;
