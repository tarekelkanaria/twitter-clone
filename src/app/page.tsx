import SideBar from "@/components/SideBar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <>
      <SideBar />
      <main className="sm:ml-20 xl:ml-72 flex-grow max-w-xl xl:min-w-[576px] border-r border-l border-gray-200">
        <Feed />
      </main>
      <Widgets />
    </>
  );
}
