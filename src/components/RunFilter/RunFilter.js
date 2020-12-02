import React from "react";
import FormItem from "../FormItem/FormItem.js";

import ModalControl from "../Modal/ModalControl/ModalControl.js";

function RunFilter() {
  return (
    <div>
      <ModalControl
        title="Filter Runs"
        triggerCopy={"Filter"}
        buttonAttrs={{ icon: "filter" }}
      >
        <form>
          <FormItem
          label="Hide Completed Runs"
            type="checkbox"
            ident="filter-completed"
            updateHandler={() => {
              console.log("check");
            }}
          />
        </form>
      </ModalControl>
    </div>
  );
}

export default RunFilter;
