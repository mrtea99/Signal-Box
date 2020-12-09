import React from "react";

import Button from "../Button/Button.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";
import FormItem from "../FormItem/FormItem.js";

const productTemplates = [
  {
    baseName: "Soap Base",
    baseType: "Common Base",
    baseSKU: "BN00002",
    baseVariation: "White Vegetable Glycerine Soap",
    baseVariationSKU: "BV00001",
    productName: "Product One",
    productSKU: "MS00423",
    productCategory: "Bodycare",
    productSubcategory: "Body Scrubs",
    unitsPerBatch: 100,
    unitWeight: 5.9,
    batchWeight: 106,
    prepDifficulty: "Easy",
    manufacturingDifficulty: "Easy",
    packagingDifficulty: "Easy",
    labelingDifficulty: "Easy",
    stockDifficulty: "N/A",
    merchandising: 90,
    lowInventoryTrigger: 0,
    expirationDuration: 12,    
    storageLocation: "top shelf",
    recipeLink: "http://www.example.com",
  },
  {
    baseName: "Amazing After Shave Body Oil For Women",
    baseType: "Product Base",
    baseSKU: "BN00004",
    baseVariation: "N/A",
    baseVariationSKU: "N/A",
    productName: "Product Two",
    productSKU: "MS00425",
    productCategory: "Soy Massage Candles",
    productSubcategory: "Glass Jar Candles",
    unitsPerBatch: 150,
    unitWeight: 7.1,
    batchWeight: 70.4,
    prepDifficulty: "Medium",
    manufacturingDifficulty: "Medium",
    packagingDifficulty: "Hard",
    labelingDifficulty: "Easy",
    stockDifficulty: "N/A",
    merchandising: 0,
    lowInventoryTrigger: 20,
    expirationDuration: 6,
    storageLocation: "bottom shelf",
    recipeLink: "http://www.example.com",
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
    const currentQuantity = thisRunData.batchQuantity;
    return currentQuantity;
  });

  const handleSubmit = function (e) {
    e.preventDefault();

    let productInfo = { ...productTemplates[currentTemplate] };
    // productInfo.batchQuantity = batchQuantity;

    props.handleSave(productInfo, {batchQuantity: batchQuantity});
  };

  return (
    <form>
      <FormItem
        label="Product:"
        type="select"
        updateHandler={(value) => {
          setTemplate(value);
        }}
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
      </FormItem>
      <FormItem
        label="Batch Quantity:"
        type="number"
        updateHandler={(value) => {
          setBatchQuantity(parseInt(value));
        }}
        value={batchQuantity}
        min="0"
      />
      <ButtonSpacer align="right">
        <Button
          onClick={(e) => {
            e.preventDefault();
            props.handleCancel();
          }}
          color="cancel"
        >
          Cancel
        </Button>
        <Button
          disabled={currentTemplate === null ? "disabled" : ""}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </ButtonSpacer>
      {/* <pre>{JSON.stringify(productTemplates[currentTemplate])}</pre> */}
    </form>
  );
}

export default RunInfoForm;
