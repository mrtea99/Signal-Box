import React from "react";

import Button from "../Button/Button.js";

const productTemplates = [
  {
    productName: "Product One",
    productSKU: "MS00423",
    productCategory: "Bodycare",
    productSubcategory: "Body Scrubs",
    averageBatchQuantity: 18,
    averageUnitWeight: 5.9,
    batchWeight: 106,
    unitsPerBatch: 100,
    prepDiffilculty: "Easy",
    manufacturingDifficulty: "Easy",
    packagingDiffilculty: "Easy",
    labelingDifficulty: "Easy",
    merchandising: 90,
    lowInventoryTrigger: 0,
    duplicate: 1,
  },
  {
    productName: "Product Two",
    productSKU: "MS00425",
    productCategory: "Soy Massage Candles",
    productSubcategory: "Glass Jar Candles",
    averageBatchQuantity: 10,
    averageUnitWeight: 7.1,
    batchWeight: 70.4,
    unitsPerBatch: 150,
    prepDiffilculty: "Medium",
    manufacturingDifficulty: "Medium",
    packagingDiffilculty: "Hard",
    labelingDifficulty: "Easy",
    merchandising: 0,
    lowInventoryTrigger: 0,
    duplicate: 1,
  },
];

function RunInfoForm(props) {
  const thisRunData = React.useState(() => {
    if (!props.runData) {
      return {};
    }

    const runData = props.runData.find(
      (obj) => obj.uid === props.currentRunUid
    );
    return runData;
  })[0];

  const [currentTemplate, setTemplate] = React.useState(() => {
    if (!props.runData) {
      return null;
    }

    const currentProductName = thisRunData.productInfo.productName;
    const templateIndex = productTemplates.findIndex(
      (obj) => obj.productName === currentProductName
    );
    return templateIndex.toString();
  });

  const [batchQuantity, setBatchQuantity] = React.useState(() => {
    if (!props.runData) {
      return 1;
    }

    const thisRunData = props.runData.find(
      (obj) => obj.uid === props.currentRunUid
    );
    const currentQuantity = thisRunData.productInfo.batchQuantity;
    return currentQuantity;
  });

  const handleSubmit = function (e) {
    e.preventDefault();

    let productInfo = { ...productTemplates[currentTemplate] };
    productInfo.batchQuantity = batchQuantity;

    props.handleSave(productInfo);
  };

  return (
    <>
      <h3>{props.runData ? "Edit Run Info" : "Create New Run"}</h3>
      <form>
        <div>
          <label>Product:</label>
          <select
            onChange={(e) => setTemplate(e.target.value)}
            value={currentTemplate === null ? "default" : currentTemplate}
          >
            <option value="default" disabled="disabled">
              Choose a template
            </option>
            {productTemplates.map((template, index) => (
              <option key={template.productName} value={index}>
                {template.productName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Batch Quantity:</label>
          <input
            onChange={(e) => {
              setBatchQuantity(e.target.value);
            }}
            type="number"
            defaultValue={batchQuantity}
            min="0"
          ></input>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            props.handleCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={currentTemplate === null ? "disabled" : ""}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </form>
      {/* <pre>{JSON.stringify(productTemplates[currentTemplate])}</pre> */}
    </>
  );
}

export default RunInfoForm;
