import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button.js";

function Pager(props) {
  const [pageNumberChild, setPageNumberChild] = React.useState(0);

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
      {pageNumber > 0 ? (
        <Button
          onClick={() =>
            setPageNumber(pageNumber > 0 ? pageNumber - 1 : pageNumber)
          }
        >
          Prev
        </Button>
      ) : null}
      {pageNumber < props.pages.length - 1 ? (
        <Button
          onClick={() =>
            setPageNumber(
              pageNumber < props.pages.length - 1 ? pageNumber + 1 : pageNumber
            )
          }
        >
          Next
        </Button>
      ) : null}
    </>
  );
}

Pager.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Pager;
