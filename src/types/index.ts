import { IconType } from "react-icons/lib/esm/iconBase";

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

export interface RetrievedPostType {
  id: string;
  name: string;
  userName: string;
  userImg: string;
  postText: string;
  postImg: string;
  timestamp: string;
}
