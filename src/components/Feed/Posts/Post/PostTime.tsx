"use client";

import Moment from "react-moment";
import type { PostTimeProps } from "@/types";

const PostTime = ({ time }: PostTimeProps) => {
  return (
    <Moment
      className="text-sm sm:text-base text-gray-500 hover:underline transition-colors duration-150"
      fromNow
    >
      {time}
    </Moment>
  );
};

export default PostTime;
