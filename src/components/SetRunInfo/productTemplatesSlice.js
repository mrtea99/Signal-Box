import { createSlice } from "@reduxjs/toolkit";

import productTemplateData from "../../data/productTemplates.json";

const ProductTemplatesSlice = createSlice({
  name: "productTemplates",
  initialState: {
    productTemplatesList: productTemplateData,
  },
  reducers: {},
});

export default ProductTemplatesSlice.reducer;

// Selectors
//------------------------------------
export const selectAllProductTemplates = (state) =>
  state.productTemplates.productTemplatesList;
