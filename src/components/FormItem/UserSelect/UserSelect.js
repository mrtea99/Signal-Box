import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import FormItem from "../FormItem";

function UserSelect(props) {
  const { excludedUsers, ...itemProps } = props;

  const userList = useSelector((state) => state.users.usersList);

  return (
    <FormItem
      {...itemProps}
      type="select"
      value={props.value ? props.value : ""}
      updateHandler={(value) => {
        if (value.length) {
          props.updateHandler(value);
        } else {
          props.updateHandler(null);
        }
      }}
    >
      <option key="default" value="">
        None
      </option>
      {userList.map((user) =>
        excludedUsers && excludedUsers.includes(user.id) ? null : (
          <option key={user.id} value={user.id}>
            {user.title}
          </option>
        )
      )}
    </FormItem>
  );
}

UserSelect.propTypes = {
  value: PropTypes.string,
  updateHandler: PropTypes.func.isRequired,
};

export default UserSelect;
