import { createSlice } from "@reduxjs/toolkit";

export type QuoteState = {
  shouldShownNewQuoteForm: boolean;
  showShownEditQuoteForm: boolean;
  shouldRefetchQuotes: boolean;
};

const initialState: QuoteState = {
  shouldShownNewQuoteForm: false,
  showShownEditQuoteForm: false,
  shouldRefetchQuotes: false,
};

export const quotes = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    openNewQuoteForm: (state) => ({
      ...state,
      shouldShownNewQuoteForm: true,
      showShownEditQuoteForm: false,
    }),
    closeNewQuoteForm: (state) => ({
      ...state,
      shouldShownNewQuoteForm: false,
    }),
    openEditQuoteForm: (state) => ({
      ...state,
      shouldShownNewQuoteForm: false,
      showShownEditQuoteForm: true,
    }),
    refetchQuotes: (state) => ({
      ...state,
      shouldRefetchQuotes: !state.shouldRefetchQuotes,
    }),
  },
});

export const {
  openNewQuoteForm,
  openEditQuoteForm,
  refetchQuotes,
  closeNewQuoteForm,
} = quotes.actions;
export default quotes.reducer;
