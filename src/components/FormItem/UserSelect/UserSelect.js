import React from "react";
import PropTypes from "prop-types";

import FormItem from "../FormItem";

const userData = [
  {
    displayName: "Jesus Sandoval",
    uid: 1,
  },
  {
    displayName: "Amanda Kezios",
    uid: 2,
  },
];

function UserSelect(props) {
  const { excludedUsers, ...itemProps } = props;

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
      {userData.map((user) =>
        excludedUsers && excludedUsers.includes(user.uid) ? null : (
          <option key={user.uid} value={user.uid}>
            {user.displayName}
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
