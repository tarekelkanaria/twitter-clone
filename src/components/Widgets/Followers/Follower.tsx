import type { FollowerProfile } from "@/types";

const Follower = ({
  name: { first: firstName, last: lastName },
  login: { username },
  picture: { thumbnail },
}: FollowerProfile) => {
  return (
    <article className="widget-item-container cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt={firstName}
        width="40"
        className="rounded-full"
      />
      <div className="truncate ml-4 leading-5">
        <h3 className="font-bold text-sm hover:underline truncate">
          {username}
        </h3>
        <p className="text-xs text-gray-500 truncate">{`${firstName} ${lastName}`}</p>
      </div>
      <button
        type="button"
        className="ml-auto px-3.5 py-1.5 font-bold text-sm bg-black text-white rounded-full"
      >
        Follow
      </button>
    </article>
  );
};

export default Follower;
