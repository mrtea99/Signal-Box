import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import FormItem from "../../FormItem/FormItem.js";

import DataList from "../../DataList/DataList.js";
import DataListItem from "../../DataList/DataListItem/DataListItem.js";

import styles from "./SetRunInfoForm.module.css";

import { selectAllProductTemplates } from "../productTemplatesSlice.js";

import { useTranslation } from "react-i18next";

/**
 * Form to set run parameters, wither on creation or editing.
 * Users can choose product, batch count, priority and start date.
 * Selected product read-only data is displayed.
 * Unit count is calculated from batch count.
 */

function SetRunInfoForm({ formData, setFormData }) {
  const { t } = useTranslation();

  const updateFormData = function (field, value) {
    let updatedFormData = { ...formData };

    updatedFormData[field] = value;

    setFormData(updatedFormData);
  };

  const productTemplates = useSelector(selectAllProductTemplates);

  const currentTemplateData = productTemplates.find(
    (template) => template.productSKU === formData.currentTemplate
  );

  return (
    <form>
      <div className={styles.formMain}>
        <div className={styles.userFields}>
          <FormItem
            label={`${t("Product")}:`}
            type="select"
            ident="product"
            updateHandler={(value) => {
              updateFormData("currentTemplate", value);
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
            {productTemplates.map((template) => (
              <option key={template.productSKU} value={template.productSKU}>
                {template.productName}
              </option>
            ))}
          </FormItem>
          {currentTemplateData ? (
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
              <DataList>
                <DataListItem
                  dataKey={t("Unit Quantity")}
                  dataValue={
                    formData.batchQuantity * currentTemplateData.unitsPerBatch
                  }
                ></DataListItem>
              </DataList>
            </>
          ) : null}
          <FormItem
            label={`${t("Priority")}:`}
            type="select"
            ident="run-priority"
            updateHandler={(value) => {
              updateFormData("priority", parseInt(value));
            }}
            value={formData.priority === null ? 1 : formData.priority}
          >
            {[1, 2, 3, 4, 5].map((priority) => (
              <option key={"Priority-" + priority} value={priority}>
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
          {currentTemplateData ? (
            <DataList>
              <DataListItem
                dataKey={t("SKU")}
                dataValue={currentTemplateData.productSKU}
              />
              <DataListItem
                dataKey={t("Product Category")}
                dataValue={currentTemplateData.productCategory}
              />
              <DataListItem
                dataKey={t("Product Subcategory")}
                dataValue={currentTemplateData.productSubcategory}
              />
              <DataListItem
                dataKey={t("Base Name")}
                dataValue={currentTemplateData.baseName}
              />
              <DataListItem
                dataKey={t("Base Type")}
                dataValue={currentTemplateData.baseType}
              />
              <DataListItem
                dataKey={t("Base Variation")}
                dataValue={currentTemplateData.baseVariation}
              />
            </DataList>
          ) : null}
        </div>
      </div>
    </form>
  );
}

SetRunInfoForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default SetRunInfoForm;
