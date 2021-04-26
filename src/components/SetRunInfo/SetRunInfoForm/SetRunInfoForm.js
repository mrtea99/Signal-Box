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

function SetRunInfoForm({ formData, setFormData }) {
  const { t } = useTranslation();

  const updateFormData = function (field, value) {
    let updatedFormData = { ...formData };

    updatedFormData[field] = value;

    setFormData(updatedFormData);
  };

  return (
    <form>
      <div className={styles.formMain}>
        <div className={styles.userFields}>
          <FormItem
            label={`${t("Product")}:`}
            type="select"
            ident="product"
            updateHandler={(value) => {
              updateFormData("currentTemplate", parseInt(value));
            }}
            value={
              formData.currentTemplate === null
                ? "default"
                : formData.currentTemplate
            }
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
          {productTemplates[formData.currentTemplate] ? (
            <>
              <FormItem
                label={`${t("Batch Quantity")}:`}
                type="number"
                ident="quantity"
                updateHandler={(value) => {
                  updateFormData("batchQuantity", parseInt(value));
                }}
                value={formData.batchQuantity}
                min="0"
              />
              <p>
                {t("Unit Quantity")}:{" "}
                {formData.batchQuantity *
                  productTemplates[formData.currentTemplate].unitsPerBatch}
              </p>
            </>
          ) : null}
          <FormItem
            label={`${t("Priorty")}:`}
            type="select"
            ident="run-priority"
            updateHandler={(value) => {
              updateFormData("priority", parseInt(value));
            }}
            value={formData.priority === null ? 1 : formData.priority}
          >
            {[1, 2, 3, 4, 5].map((priority) => (
              <option key={"priorty-" + priority} value={priority}>
                {priority}
              </option>
            ))}
          </FormItem>

          <FormItem
            ident="run-target-start-date"
            type="date"
            label={`${t("Target Start Date")}:`}
            value={formData.targetStartDate}
            updateHandler={(value) => {
              updateFormData("targetStartDate", new Date(value).toISOString());
            }}
          />
        </div>

        <div className={styles.readOnly}>
          <h3 className={styles.readOnlyTitle}>{t("Product Info")}:</h3>
          {productTemplates[formData.currentTemplate] ? (
            <DataList>
              <DataListItem
                dataKey={t("SKU")}
                dataValue={
                  productTemplates[formData.currentTemplate].productSKU
                }
              />
              <DataListItem
                dataKey={t("Base Name")}
                dataValue={productTemplates[formData.currentTemplate].baseName}
              />
              <DataListItem
                dataKey={t("Base Type")}
                dataValue={productTemplates[formData.currentTemplate].baseType}
              />
            </DataList>
          ) : null}
        </div>
      </div>

      {/* <pre>{JSON.stringify(productTemplates[currentTemplate])}</pre> */}
    </form>
  );
}

SetRunInfoForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default SetRunInfoForm;
