import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../../components/ui/ProductAddModal/product.types";

interface TInitialState extends TProduct {
  user: string;
  releaseData: Date;
  operatingSystem: string;
}

const initialState: TInitialState[] = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    deletedProduct: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default productSlice.reducer;
