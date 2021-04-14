import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

function UserName(props) {
  const { t } = useTranslation();

  const userData = useSelector((state) => {
    return state.users.usersList.find(
      (userItem) => userItem.Id === parseInt(props.userId)
    );
  });

  return (
    <>{userData === undefined ? t("User ID not found") : userData.Title}</>
  );
}

UserName.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserName;
