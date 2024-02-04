import { TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_QUOTE } from "@/src/config/queries";
import { Quote } from "./Quotes"; // Import the Quote type directly
import Swal from "sweetalert2";

interface DetailQuoteType {
  quoteRow: Quote;
  triggerRefetch: any;
}
const DetailQuote = ({ quoteRow, triggerRefetch }: DetailQuoteType) => {
  const { id, quote: quoteText, reference, author, book, created } = quoteRow;

  const [deleteQuote] = useMutation(DELETE_QUOTE);

  const handleDeleteQuote = () => {
    Swal.fire({
      title: "Do you want to delete this Quote?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteQuote({
            variables: {
              id,
            },
          });
          Swal.fire({
            title: "Deleted!",
            text: data.deleteQuote,
            icon: "success",
          });
          triggerRefetch();
        } catch (error) {
          console.log("Error handleDeleteQuote => ", error);
        }
      }
    });
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
        <TableCell align="right">{created}</TableCell>
        <TableCell align="right">
          <EditIcon />
          <DeleteIcon onClick={handleDeleteQuote} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default DetailQuote;
