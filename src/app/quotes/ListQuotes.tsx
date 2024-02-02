"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GET_QUOTES } from "@/src/config/queries";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Quote } from "./Quotes";

const ListQuotes = ({ refetchTriggered }: any) => {
  const { data, loading, client, refetch } = useQuery(GET_QUOTES);

  useEffect(() => {
    const refetchQuotes = async () => {
      await refetch();
    };
    refetchQuotes();
  }, [refetchTriggered, refetch]);

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
            {data?.getQuotes.length > 0 ? (
              data?.getQuotes.map((item: Quote) => {
                return (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{item.quote}</TableCell>
                    <TableCell align="right">{item.reference}</TableCell>
                    <TableCell align="right">{item.author}</TableCell>
                    <TableCell align="right">{item.book}</TableCell>
                    <TableCell align="right">{item.created}</TableCell>
                    <TableCell align="right">
                      <EditIcon />
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                );
              })
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
