import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button.js";

import { useTranslation } from "react-i18next";

/**
 * Displays content in pages, with previous / next buttons.
 */

function Pager(props) {
  const { t } = useTranslation();

  const [pageNumberChild, setPageNumberChild] = useState(0);

  const pageNumber =
    props.pageNumber !== undefined ? props.pageNumber : pageNumberChild;
  const setPageNumber =
    props.setPageNumber !== undefined
      ? props.setPageNumber
      : setPageNumberChild;

  return (
    <>
      {props.pages.map((page, index) => {
        return index === pageNumber ? page : null;
      })}
      <br />
      {/* {pageNumber > 0 ? ( */}
      <Button
        disabled={pageNumber === 0}
        onClick={() =>
          setPageNumber(pageNumber > 0 ? pageNumber - 1 : pageNumber)
        }
      >
        {t("Prev")}
      </Button>
      {/* ) : null} */}
      {/* {pageNumber < props.pages.length - 1 ? ( */}
      <Button
        disabled={pageNumber === props.pages.length - 1}
        onClick={() =>
          setPageNumber(
            pageNumber < props.pages.length - 1 ? pageNumber + 1 : pageNumber
          )
        }
      >
        {t("Next")}
      </Button>
      {/* ) : null} */}
    </>
  );
}

Pager.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Pager;
