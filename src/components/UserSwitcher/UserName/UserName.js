import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function UserName(props) {
  const userData = useSelector((state) => {
    return state.users.usersList.find(
      (userItem) => userItem.id === parseInt(props.userId)
    );
  });

  return (
    <>
      {userData === undefined ? "User ID not found" : userData.title}
    </>
  );
}

UserName.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserName;
