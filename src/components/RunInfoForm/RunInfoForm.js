import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button.js";
import ButtonSpacer from "../Button/ButtonSpacer/ButtonSpacer.js";
import FormItem from "../FormItem/FormItem.js";

import styles from "./RunInfoForm.module.css";
import DataList from "../DataList/DataList.js";
import DataListItem from "../DataList/DataListItem/DataListItem.js";

import productTemplates from "../../data/productTemplates.json";

function RunInfoForm(props) {
  const thisRunData = React.useState(() => {
    if (!props.runData) {
      return {};
    }

    const runData = props.runData.find((obj) => obj.id === props.currentRunUid);
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
      (obj) => obj.id === props.currentRunUid
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
            ident="product"
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
                ident="quantity"
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
          {productTemplates[currentTemplate] ? (
            <DataList>
              <DataListItem
                dataKey="SKU"
                dataValue={productTemplates[currentTemplate].productSKU}
              />
              <DataListItem
                dataKey="Base Name"
                dataValue={productTemplates[currentTemplate].baseName}
              />
              <DataListItem
                dataKey="Base Type"
                dataValue={productTemplates[currentTemplate].baseType}
              />
            </DataList>
          ) : null}
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
