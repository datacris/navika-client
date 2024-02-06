import { TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_QUOTE } from "@/src/config/queries";
import { Quote } from "./Quotes";
import Swal from "sweetalert2";
import {
  AlertType,
  showNotification,
} from "@/src/components/layout/Notification";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux/store";
import {
  clearQuotesAndRefetch,
  openEditQuoteForm,
} from "@/src/redux/features/quotes-slice";

interface DetailQuoteType {
  quoteRow: Quote;
}
const DetailQuote = ({ quoteRow }: DetailQuoteType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id, quote: quoteText, reference, author, book, created } = quoteRow;
  const createdTransformation = new Date(created * 1000).toLocaleString();
  const [deleteQuote] = useMutation(DELETE_QUOTE);

  const handleDeleteQuote = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteQuote({
            variables: {
              id,
            },
          });
          showNotification({
            message: `Quote Deleted`,
            type: AlertType.success,
          });
          dispatch(clearQuotesAndRefetch());
        } catch (error) {
          console.log("Error handleDeleteQuote => ", error);
        }
      }
    });
  };

  const handleEditQuote = () => {
    dispatch(openEditQuoteForm(id));
  };

  const formatTimestampToDate = (timestampInSeconds: any) => {
    const date = new Date(timestampInSeconds * 1);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  return (
    <>
      <TableRow
        key={id}
        hover
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="right">{quoteText}</TableCell>
        <TableCell align="right">{reference}</TableCell>
        <TableCell align="right">{author}</TableCell>
        <TableCell align="right">{book}</TableCell>
        <TableCell align="right">{formatTimestampToDate(created)}</TableCell>
        <TableCell align="right">
          <EditIcon onClick={handleEditQuote} />
          <DeleteIcon onClick={handleDeleteQuote} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default DetailQuote;
