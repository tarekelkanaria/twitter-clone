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

export type FeedHeaderProps = {
  isInPost: boolean;
};
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

export interface RetrievedPostType extends UploadedPostType {
  id: string;
  timestamp: Timestamp;
}

export interface IndividualPostProps extends RetrievedPostType {
  commentId?: string;
}

export type DeletedPostType = {
  postId: string;
  postImg?: string;
  commentId?: string;
};

export interface UploadedCommentType {
  id: string;
  uid: string;
  name: string;
  userName: string;
  userImg: string;
  text: string;
}

export interface RetrievedCommentType extends UploadedCommentType {
  postId: string;
  timestamp: Timestamp;
}

export type UploadedLikeType = {
  id: string;
  userId: string;
  userName: string;
  userImg: string;
  hasLiked: boolean;
  commentId?: string;
};

export type RetrievedLikeType = {
  id: string;
  userName: string;
  userImg: string;
};

export type PostTimeProps = {
  time: Date;
};

export type LikeActionProps = {
  postId: string;
  allLikes: RetrievedLikeType[];
  userName: string;
  userImg: string;
  commentId?: string;
};

export type TrashProps = {
  postId: string;
  postImg: string | null;
  commentId?: string;
};

export type CommentActionProps = {
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
  payload: CommentActionProps;
};

export type PostPageProps = {
  params: {
    id: string;
  };
};

export type CommentsListProps = {
  commentsList: RetrievedCommentType[];
};
