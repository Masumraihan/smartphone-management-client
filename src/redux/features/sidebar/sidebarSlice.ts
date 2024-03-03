import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});
export const { closeSidebar, openSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
