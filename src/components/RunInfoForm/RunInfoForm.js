import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";
import FormItem from "../FormItem/FormItem.js";

import styles from "./RunInfoForm.module.css";

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
      (obj) => obj.runId === props.currentRunUid
    );
    return runData;
  })[0];

  const [currentTemplate, setTemplate] = React.useState(() => {
    if (!props.runData) {
      return null;
    }

    const currentProductSKU = thisRunData.productInfo.productSKU;
    const templateIndex = productTemplates.findIndex(
      (obj) => obj.productSKU === currentProductSKU
    );
    return templateIndex;
  });

  const [batchQuantity, setBatchQuantity] = React.useState(() => {
    if (!props.runData) {
      return 1;
    }

    const thisRunData = props.runData.find(
      (obj) => obj.runId === props.currentRunUid
    );
    const currentQuantity = thisRunData.batchQuantity;
    return currentQuantity;
  });

  const handleSubmit = function (e) {
    e.preventDefault();

    let productInfo = { ...productTemplates[currentTemplate] };

    props.handleSave(productInfo, batchQuantity);
  };

  return (
    <form>
      <div className={styles.formMain}>
        <div className={styles.userFields}>
          <FormItem
            label="Product:"
            type="select"
            updateHandler={(value) => {
              setTemplate(parseInt(value));
            }}
            value={currentTemplate === null ? "default" : currentTemplate}
          >
            <option value="default" disabled>
              Choose a template
            </option>
            {productTemplates.map((template, index) => (
              <option key={template.productName} value={index}>
                {template.productName}
              </option>
            ))}
          </FormItem>
          {productTemplates[currentTemplate] ? (
            <>
              <FormItem
                label="Batch Quantity:"
                type="number"
                updateHandler={(value) => {
                  setBatchQuantity(parseInt(value));
                }}
                value={batchQuantity}
                min="0"
              />
              <p>
                Unit Quantity:{" "}
                {batchQuantity *
                  productTemplates[currentTemplate].unitsPerBatch}
              </p>
            </>
          ) : null}
        </div>

        <div className={styles.readOnly}>
          <h3 className={styles.readOnlyTitle}>Product Info:</h3>
          <ul>
            {productTemplates[currentTemplate] ? (
              <>
                <li>
                  <strong>SKU</strong>:{" "}
                  {productTemplates[currentTemplate].productSKU}
                </li>
                <li>
                  <strong>Base Name</strong>:{" "}
                  {productTemplates[currentTemplate].baseName}
                </li>
                <li>
                  <strong>Base Type</strong>:{" "}
                  {productTemplates[currentTemplate].baseType}
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
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
          disabled={currentTemplate === null ? true : false}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </ButtonSpacer>
      {/* <pre>{JSON.stringify(productTemplates[currentTemplate])}</pre> */}
    </form>
  );
}

RunInfoForm.propTypes = {
  runData: PropTypes.array,
  currentRunUid: PropTypes.number,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default RunInfoForm;
