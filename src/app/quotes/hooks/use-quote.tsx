import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_QUOTES } from "@/src/config/queries";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import type { Quote } from "../Quotes";

const useQuote = () => {
  const { shouldRefetchQuotes } = useSelector(
    (state: RootState) => state.Quotes
  );

  const { data, loading, client, refetch } = useQuery(GET_QUOTES);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const refetchQuotes = async () => {
      await refetch();
    };
    refetchQuotes();
  }, [shouldRefetchQuotes, refetch]);

  useEffect(() => {
    if (data?.getQuotes) {
      setQuotes(data.getQuotes);
    }
  }, [data]);

  const randomQuote = (): Quote | null => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      return quote;
    }
    return null
  };

  return { quotes, randomQuote };
};
export default useQuote;
