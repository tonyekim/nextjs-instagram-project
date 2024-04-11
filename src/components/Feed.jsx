import React from "react";
import Post from "./Post";
import MiniProfile from "./MiniProfile";

const Feed = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
      {/* posts (Left side) */}
      <section className=" md:col-span-2">
        <Post />
      </section>

      {/* Mini profile (Right side) */}
      <section className=" hidden md:inline-grid md:col-span-1">
        <MiniProfile />
      </section>
    </main>
  );
};

export default Feed;
