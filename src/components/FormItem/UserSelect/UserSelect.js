import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import FormItem from "../FormItem";

function UserSelect(props) {
  const { excludedUsers, ...itemProps } = props;

  const usersList = useSelector((state) => state.users.usersList);

  return (
    <FormItem
      {...itemProps}
      type="select"
      value={props.value ? props.value : ""}
      updateHandler={(value) => {
        if (value.length) {
          props.updateHandler(parseInt(value));
        } else {
          props.updateHandler(null);
        }
      }}
    >
      <option key="default" value="">
        None
      </option>
      {usersList.map((user) =>
        excludedUsers && excludedUsers.includes(user.Id) ? null : (
          <option key={user.Id} value={user.Id}>
            {user.Title}
          </option>
        )
      )}
    </FormItem>
  );
}

UserSelect.propTypes = {
  value: PropTypes.number,
  updateHandler: PropTypes.func.isRequired,
};

export default UserSelect;
