"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Quote } from "./Quotes";
import DetailQuote from "./DetailQuote";
import useQuote from './hooks/use-quote'

const ListQuotes = () => {
  const { quotes } = useQuote();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow className="bg-blue-100 opacity-80">
              <TableCell align="right">Quote</TableCell>
              <TableCell align="right">Reference</TableCell>
              <TableCell align="right">Author&nbsp;(s)</TableCell>
              <TableCell align="right">Book&nbsp;</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.length > 0 ? (
              quotes.map((item: Quote) => (
                <DetailQuote key={item.id} quoteRow={item} />
              ))
            ) : (
              <TableCell align="right">No data</TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListQuotes;
