"use client";

import { useState } from "react";
import { FollowerProfile } from "@/types";
import Follower from "./Follower";

type Props = {
  items: FollowerProfile[];
};

const Followers = ({ items }: Props) => {
  const [followersCount, setFollowersCount] = useState<number>(3);
  const showedFollowers = items.slice(0, followersCount);

  return (
    <section className="widget-container sticky top-16">
      <h2 className="widget-title">Who to follow</h2>
      {showedFollowers.map((follower) => (
        <Follower key={follower?.login?.uuid} {...follower} />
      ))}
      <button
        type="button"
        className="widget-btn"
        onClick={() => setFollowersCount((prevCount) => prevCount + 3)}
      >
        Show more
      </button>
    </section>
  );
};

export default Followers;
