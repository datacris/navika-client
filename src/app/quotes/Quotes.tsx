"use client";
import React, { useState } from "react";
import ListQuotes from "./ListQuotes";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import NewQuote from "./NewQuote";
import { Grid } from "@mui/material";

export type Quote = {
  id: string;
  quote: string;
  reference: string;
  author: string;
  book: string;
  created: string;
};

const Quotes = () => {
  const [showCreateNewQuote, setShowCreateNewQuote] = useState(false);

  const [refetchTriggered, setRefetchTriggered] = useState(false);
  const triggerRefetch = () => {
    setRefetchTriggered(!refetchTriggered);
  };

  const toogleShowCreateNewQuote = () => {
    setShowCreateNewQuote(!showCreateNewQuote);
  };

  const card = (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          Quotes
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Admin Section
        </Typography>
        <Typography variant="body2">
          Creating quotes for Word of the Day section
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="bg-blue-500 flex items-center "
          variant="contained"
          onClick={toogleShowCreateNewQuote}
        >
          <AddIcon className="mr-1 text-md" />
          Add new Quote
        </Button>
      </CardActions>
    </>
  );
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="sticky top-20">
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">{card}</Card>
            </Box>

            {showCreateNewQuote && (
              <Box sx={{ minWidth: 275 }}>
                <Card className="mt-4" variant="outlined">
                  <NewQuote
                    toogleShowCreateNewQuote={toogleShowCreateNewQuote}
                    triggerRefetch={triggerRefetch}
                  />
                </Card>
              </Box>
            )}
          </div>
        </Grid>
        <Grid item xs={8}>
          <ListQuotes refetchTriggered={refetchTriggered} triggerRefetch={triggerRefetch} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Quotes;
