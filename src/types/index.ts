import type { IconType } from "react-icons";
import type { Session } from "next-auth";
import type { Timestamp } from "firebase/firestore";

export interface MenuItemType {
  id: string;
  text: string;
  Icon: IconType;
}

export interface MenuItemPropsType extends MenuItemType {
  active: boolean;
}

export type NewsItemType = {
  title: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
};

export type FollowerProfile = {
  name: {
    first: string;
    last: string;
  };
  login: {
    username: string;
    uuid: string;
  };
  picture: {
    thumbnail: string;
  };
};

export type ProvidersProps = {
  session: Session | null;
  children: React.ReactNode;
};

export interface UploadedPost {
  name: string;
  userName: string;
  userImg: string;
  postText: string;
  postImg: string | null;
}

export type UploadedLike = {
  id: string;
  userId: string;
  userName: string;
  userImg: string;
  hasLiked: boolean;
};

export interface RetrievedPostType extends UploadedPost {
  id: string;
  timestamp: Timestamp;
}

export type RetrievedLike = {
  id: string;
  userName: string;
  userImg: string;
};

export type PostTimeProps = {
  time: Date;
};

export type LikeProps = {
  postId: string;
  allLikes: RetrievedLike[];
  userName: string;
  userImg: string;
};
