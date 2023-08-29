import Post from "./Post";

const posts = [
  {
    id: "1",
    name: "Tarek Elkanaria",
    userName: "ElkanariaTarek",
    userImg: "https://avatars.githubusercontent.com/u/101680180?v=4",
    postImg:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
    postText: "Nice view!",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    name: "Tarek Elkanaria",
    userName: "ElkanariaTarek",
    userImg: "https://avatars.githubusercontent.com/u/101680180?v=4",
    postImg:
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postText: "I love sea",
    timestamp: "2 days ago",
  },
  {
    id: "3",
    name: "Tarek Elkanaria",
    userName: "ElkanariaTarek",
    userImg: "https://avatars.githubusercontent.com/u/101680180?v=4",
    postImg:
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    postText: "I love sea",
    timestamp: "2 days ago",
  },
];

export default function Posts() {
  return (
    <section>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
}
