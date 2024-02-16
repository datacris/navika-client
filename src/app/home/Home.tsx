/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Main from "./Main";
import MainFeaturedPost from "./MainFeaturedPost";
import { Grid } from "@mui/material";
import FeaturedPost from "./FeaturedPost";
import Sidebar from "./Sidebar";

const posts = [
  {
    title: "Quotes admin section",
    description:
      "Quotes section includes a CRUD implementation for introducing database interaction.",
  },
  {
    title: "Authentication",
    description:
      "Navika uses JWT for authentication. Some features are blocked, but will be available once a user is successfully loged in",
  },
  {
    title: "Experiments",
    description:
      "Experiment section for include new features and test new features before to be introduced into Navika",
  },
];

const mainFeaturedPost = {
  title: "Navika App",
  description:
    "Navika is a web app that serves as a portfolio, hosting experiments, and showcasing technical skills as a software developer.",
  image: "https://source.unsplash.com/random?wallpapers",
  imageText: "navika description",
  linkText: "",
};

const featuredPosts = [
  {
    title: "Next 14",
    subtitle: "React Framework",
    description:
      "Navika is powered by Next.js 14, leveraging the key features of this robust React framework for enhanced performance and web optimization.",
    image: "https://nextjs.org/static/blog/next-14/twitter-card.png",
    imageLabel: "Image Text",
  },
  {
    title: "TypeScript",
    subtitle: " Strongly Typed language",
    description:
      "TypeScript strengthens JavaScript with static types, providing early error detection and improved code maintainability for a more robust and developer-friendly experience.",
    image:
      "data:image/png;base64,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",
    imageLabel: "Image Text",
  },
  {
    title: "Apollo and GraphQL",
    subtitle: "Query language for APIs",
    description:
      "Apollo speeds up GraphQL development with a robust client and tools, while GraphQL revolutionizes API interactions through efficient queries for precise data retrieval.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYnUhMJt7KEv1INuHeIU1-epp5204WnjFCNA&usqp=CAU",
    imageLabel: "Image Text",
  },
  {
    title: "Redux",
    subtitle: "State Management",
    description:
      "Redux simplifies state management in JavaScript, ensuring a predictable and centralized store for streamlined data flow, leading to improved scalability and reliability.",
    image:
      "data:image/png;base64,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",
    imageLabel: "Image Text",
  },
  {
    title: "Mongo DB",
    subtitle: "Data Base",
    description:
      "MongoDB: NoSQL scalability meets flexibility in data storage, offering a document-oriented model for efficient development and seamless horizontal scaling.",
    image:
      "data:image/png;base64,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",
    imageLabel: "Image Text",
  },
  {
    title: "Material UI and Tailwind",
    subtitle: "CSS Frameworks",
    description:
      "Tailwind CSS streamlines styling with utility-first classes, while Material-UI provides pre-designed React components for consistent and visually appealing UI.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrACsP1KUS9H1ztzRLJnDTco3QXvMxfbo2kA&usqp=CAU",
    imageLabel: "Image Text",
  },
];

const sidebar = {
  title: "Welcome to Navika",
  description:
    " I'm thrilled to introduce you to Navika, a unique web application that goes beyond the ordinary to showcase not just efficient time management, but also a blend of innovation and creativity.",
  title2: "What Sets Navika Apart?",
  description2:
    "Front-End Mastery: Navika serves as my portfolio, showcasing my skills as a front-end developer. Each feature is a testament to my commitment to creating seamless, visually appealing, and user-friendly interfaces. Innovative Features: From eye-catching design elements to responsive layouts, Navika incorporates cutting-edge features that highlight my proficiency in modern web development.",
};

const Home = () => {
  return (
    <div className="container mx-auto mt-8 w-full">
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Main title="Navika features" posts={posts} />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            title2={sidebar.title2}
            description2={sidebar.description2}
          />
        </Grid>
      </main>
    </div>
  );
};

export default Home;
