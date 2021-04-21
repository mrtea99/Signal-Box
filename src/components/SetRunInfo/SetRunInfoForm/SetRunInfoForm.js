import React from "react";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem.js";

import DataList from "../../DataList/DataList.js";
import DataListItem from "../../DataList/DataListItem/DataListItem.js";

import styles from "./SetRunInfoForm.module.css";

import productTemplates from "../../../data/productTemplates.json";

import { useTranslation } from "react-i18next";

/**
 * Form to set run parameters, wither on creation or editing.
 * Users can choose product and batch count required.
 * Displays product data and calculates unit count.
 */

function RunInfoForm({
  currentTemplate,
  setCurrentTemplate,
  batchQuantity,
  setBatchQuantity,
}) {
  const { t } = useTranslation();

  return (
    <form>
      <div className={styles.formMain}>
        <div className={styles.userFields}>
          <FormItem
            label={`${t("Product")}:`}
            type="select"
            ident="product"
            updateHandler={(value) => {
              setCurrentTemplate(parseInt(value));
            }}
            value={currentTemplate === null ? "default" : currentTemplate}
          >
            <option value="default" disabled>
              {t("Choose a template")}
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
                label={`${t("Batch Quantity")}:`}
                type="number"
                ident="quantity"
                updateHandler={(value) => {
                  setBatchQuantity(parseInt(value));
                }}
                value={batchQuantity}
                min="0"
              />
              <p>
                {t("Unit Quantity")}:{" "}
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
                dataKey={t("SKU")}
                dataValue={productTemplates[currentTemplate].productSKU}
              />
              <DataListItem
                dataKey={t("Base Name")}
                dataValue={productTemplates[currentTemplate].baseName}
              />
              <DataListItem
                dataKey={t("Base Type")}
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
