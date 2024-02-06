import { createSlice } from "@reduxjs/toolkit";

export type QuoteState = {
  shouldShownNewQuoteForm: boolean;
  showShownEditQuoteForm: boolean;
  editQuoteId: string;
  shouldRefetchQuotes: boolean;
};

const initialState: QuoteState = {
  shouldShownNewQuoteForm: false,
  showShownEditQuoteForm: false,
  editQuoteId: "",
  shouldRefetchQuotes: false,
};

export const quotes = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    clearQuotesAndRefetch: (state) => ({
      ...initialState,
      shouldRefetchQuotes: !state.shouldRefetchQuotes,
    }),
    openNewQuoteForm: (state) => ({
      ...state,
      shouldShownNewQuoteForm: true,
      showShownEditQuoteForm: false,
    }),
    openEditQuoteForm: (state, action) => ({
      ...state,
      shouldShownNewQuoteForm: false,
      showShownEditQuoteForm: true,
      editQuoteId: action.payload,
    }),
    closeQuoteForms: (state) => ({
      ...state,
      shouldShownNewQuoteForm: false,
      showShownEditQuoteForm: false,
    }),
  },
});

export const {
  clearQuotesAndRefetch,
  openNewQuoteForm,
  openEditQuoteForm,
  closeQuoteForms,
} = quotes.actions;
export default quotes.reducer;
