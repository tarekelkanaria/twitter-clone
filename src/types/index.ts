import type { IconType } from "react-icons";
import type { Session } from "next-auth";
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

export type RetrievedPostType = {
  id: string;
  name: string;
  userName: string;
  userImg: string;
  postText: string;
  postImg: string;
  timestamp: string;
};
