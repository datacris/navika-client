import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_QUOTES } from "@/src/config/queries";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

const useQuote = () => {
  const { shouldRefetchQuotes } = useSelector(
    (state: RootState) => state.Quotes
  );

  const { data, loading, client, refetch } = useQuery(GET_QUOTES);
  const [ quotes, setQuotes ] = useState([]);

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

  return { quotes };
};
export default useQuote;
