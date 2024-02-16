import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Cormorant_Garamond, Acme } from "next/font/google";
import useQuote from "./hooks/use-quote";

const quoteTextFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "400",
});
const authorFont = Acme({
  subsets: ["latin"],
  weight: "400",
});

const DayQuote = () => {
  const { randomQuote } = useQuote();
  const quote = randomQuote();

  return (
    <>
      {quote && (
        <Card>
          <CardActionArea>
            <CardContent className="flex flex-col">
              <Typography
                className={`${quoteTextFont.className} text-4xl p-4`}
                variant="body2"
                color="text.secondary"
              >
                {`"${quote.quote}"`}
              </Typography>
              {quote.author && (
                <Typography
                  className={`${authorFont.className} self-end text-right pr-60 -mt-5`}
                >
                  {`--${quote.author}--`}
                </Typography>
              )}

              {quote.book && (
                <Typography
                  className={`${authorFont.className} self-end text-right pr-60`}
                >
                  {`--${quote.book}--`}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default DayQuote;
