import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  draft: null,
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setTransferDraft: (prevState, { payload }) => {
      prevState.draft = payload;
    },

    clearTransferDraft: (prevState) => {
      prevState.draft = null;
    },
  },
});

export const { setTransferDraft, clearTransferDraft } = transferSlice.actions;
export default transferSlice.reducer;
