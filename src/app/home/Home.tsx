/* eslint-disable react/no-unescaped-entities */
import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Navika</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Experiments</h2>
        <p>
          Explore a variety of experiments and discover new insights. From
          cutting-edge technologies to scientific breakthroughs, Navika brings
          the latest experiments to your fingertips.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Todo List</h2>
        <p>
          Stay organized with Navika's Todo List feature. Plan your day, set
          priorities, and accomplish tasks efficiently. Never miss a deadline
          again!
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
        <p>
          Manage your profile seamlessly with Navika. Update your information,
          change your preferences, and personalize your Navika experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Weather</h2>
        <p>
          Stay informed about the weather conditions in your area. Navika
          provides real-time weather updates to help you plan your activities
          accordingly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <p>
          Receive timely notifications about important events, updates, and
          personalized alerts. Navika keeps you in the loop and ensures you
          never miss a beat.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Reminders</h2>
        <p>
          Set reminders for crucial tasks and events. Navika's reminder feature
          helps you stay organized and ensures you never forget important
          deadlines or appointments.
        </p>
      </section>
    </div>
  );
};

export default Home;
