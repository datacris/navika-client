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
    title: "Experiments",
    description:
      "Explore a variety of experiments and discover new insights. From cutting-edge technologies to scientific breakthroughs, Navika brings the latest experiments to your fingertips.",
  },
  {
    title: "Todo List",
    description:
      "Stay organized with Navika's Todo List feature. Plan your day, set priorities, and accomplish tasks efficiently. Never miss a deadline again!",
  },
  {
    title: "Profile Management",
    description:
      "Manage your profile seamlessly with Navika. Update your information, change your preferences, and personalize your Navika experience.",
  },
];

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random?wallpapers",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
  },
];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
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
          <Main title="From the firehose" posts={posts} />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
          />
        </Grid>
      </main>
      
    </div>
  );
};

export default Home;
