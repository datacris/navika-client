import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface SidebarProps {
  archives?: ReadonlyArray<{
    url: string;
    title: string;
  }>;
  description: string;
  title: string;
  description2: string;
  title2: string;
}

export default function Sidebar(props: SidebarProps) {
  const { description, title, title2, description2 } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Typography className="pt-2" variant="h6" gutterBottom>
          {title2}
        </Typography>
        <Typography>{description2}</Typography>
      </Paper>
    </Grid>
  );
}
