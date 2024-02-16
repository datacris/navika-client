import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface MainProps {
  posts: ReadonlyArray<string>;
  title: string;
}

export default function Main(props: any) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post: any) => {
        return (
          <section className="mb-8" key={post.title}>
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <p>{post.description}</p>
          </section>
        );
      })}
    </Grid>
  );
}
