import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Cormorant_Garamond, Acme } from 'next/font/google';

const quoteTextFont = Cormorant_Garamond({
    subsets: ['latin'],
    weight: '400'
})
const authorFont = Acme({
    subsets: ['latin'],
    weight: '400'
})

const DayQuote = () => {
    return (
        <Card >
          <CardActionArea>
            <CardContent className='flex flex-col' >
              <Typography className={`${quoteTextFont.className} text-4xl p-4`} variant="body2" color="text.secondary">
                "Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica"
              </Typography>
              <Typography className={`${authorFont.className} self-end text-right pr-60 -mt-5`}> -- Author -- </Typography>
              <Typography className={`${authorFont.className} self-end text-right pr-60`}> -- Book -- </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
}

export default DayQuote;
