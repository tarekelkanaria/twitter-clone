"use client";

import { useState } from "react";
import AnimateClient from "@/Providers/AnimateClient";
import MotionClient from "@/Providers/MotionClient";
import type { FollowersListProps } from "@/types";
import Follower from "./Follower";

const FollowersList = ({ items }: FollowersListProps) => {
  const [followersCount, setFollowersCount] = useState<number>(3);
  const showedFollowers = items.slice(0, followersCount);

  return (
    <section className="widget-container sticky top-16">
      <h2 className="widget-title">Who to follow</h2>
      <AnimateClient>
        {showedFollowers.map((follower) => (
          <MotionClient key={follower?.login?.uuid}>
            <Follower {...follower} />
          </MotionClient>
        ))}
      </AnimateClient>
      {followersCount < 30 && (
        <button
          type="button"
          className="widget-btn"
          onClick={() => setFollowersCount((prevCount) => prevCount + 3)}
        >
          Show more
        </button>
      )}
    </section>
  );
};

export default FollowersList;
