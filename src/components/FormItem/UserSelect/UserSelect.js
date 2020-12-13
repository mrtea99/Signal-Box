import React from "react";

import FormItem from "../FormItem";

const userData = [
  {
    displayName: "Jesus Sandoval",
    uid: "1",
  },
  {
    displayName: "Amanda Kezios",
    uid: "2",
  },
];

function UserSelect(props) {
  return (
    <FormItem
      {...props}
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
      {userData.map((user) => (
        <option key={user.uid} value={user.uid}>
          {user.displayName}
        </option>
      ))}
    </FormItem>
  );
}

export default UserSelect;
