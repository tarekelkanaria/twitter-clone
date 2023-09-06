"use client";

import Moment from "react-moment";
import type { PostTimeProps } from "@/types";

const PostTime = ({ time }: PostTimeProps) => {
  return (
    <Moment className="time" fromNow>
      {time}
    </Moment>
  );
};

export default PostTime;
