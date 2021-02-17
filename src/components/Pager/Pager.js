import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button.js";

{/* <Pager
pages={[
  <React.Fragment key="key1">Page1</React.Fragment>,
  <React.Fragment key="key2">Page2</React.Fragment>,
  <React.Fragment key="key3">Page3</React.Fragment>,
  <React.Fragment key="key4">Page4</React.Fragment>,
]}
>
Test
</Pager> */}


function Pager(props) {
  const [pageNumber, setPageNumber] = React.useState(
    props.pageNumber !== undefined ? props.pageNumber : 0
  );

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
