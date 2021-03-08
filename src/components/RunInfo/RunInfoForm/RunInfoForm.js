import React from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem.js";

import styles from "./RunInfoForm.module.css";
import DataList from "../../DataList/DataList.js";
import DataListItem from "../../DataList/DataListItem/DataListItem.js";

import productTemplates from "../../../data/productTemplates.json";

function RunInfoForm(props) {
  const {
    currentTemplate,
    setCurrentTemplate,
    batchQuantity,
    setBatchQuantity,
  } = props;

  return (
    <form>
      <div className={styles.formMain}>
        <div className={styles.userFields}>
          <FormItem
            label="Product:"
            type="select"
            ident="product"
            updateHandler={(value) => {
              setCurrentTemplate(parseInt(value));
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

      {/* <pre>{JSON.stringify(productTemplates[currentTemplate])}</pre> */}
    </form>
  );
}

RunInfoForm.propTypes = {
  currentTemplate: PropTypes.number,
  setCurrentTemplate: PropTypes.func.isRequired,
  batchQuantity: PropTypes.number.isRequired,
  setBatchQuantity: PropTypes.func.isRequired,
};

export default RunInfoForm;
