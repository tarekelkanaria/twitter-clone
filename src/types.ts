import store from "./redux/store";
import type { IconType } from "react-icons";
import type { Session } from "next-auth";
import type { Timestamp } from "firebase/firestore";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ParentProps {
  children: React.ReactNode;
}

export interface ClientProvidersProps extends ParentProps {
  session: Session | null;
}

export interface MenuItemType {
  id: string;
  text: string;
  Icon: IconType;
}

export interface MenuItemProps extends MenuItemType {
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

export type NewsListProps = {
  items: NewsItemType[];
  count: number;
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

export type FollowersListProps = {
  items: FollowerProfile[];
};

export interface UploadedPostType {
  uid: string;
  name: string;
  userName: string;
  userImg: string;
  postText: string;
  postImg: string | null;
}

export type UploadedLikeType = {
  id: string;
  userId: string;
  userName: string;
  userImg: string;
  hasLiked: boolean;
};

export type UploadedCommentType = {
  id: string;
  name: string;
  userName: string;
  userImg: string;
  text: string;
};

export interface RetrievedPostType extends UploadedPostType {
  id: string;
  timestamp: Timestamp;
}

export type RetrievedLikeType = {
  id: string;
  userName: string;
  userImg: string;
};

export type PostTimeProps = {
  time: Date;
};

export type LikeProps = {
  postId: string;
  allLikes: RetrievedLikeType[];
  userName: string;
  userImg: string;
};

export type TrashProps = {
  postId: string;
  postImg: string | null;
};

export type CommentProps = {
  postId: string;
  name: string;
  userName: string;
  userImg: string;
  postText: string;
  timestamp: Date;
  count: number;
};

export type CommentSliceState = {
  isVisible: boolean;
  info: {
    postId: string;
    name: string;
    userName: string;
    userImg: string;
    postText: string;
    timestamp: Date;
  };
};

export type PostInfoAction = {
  type: string;
  payload: CommentProps;
};
