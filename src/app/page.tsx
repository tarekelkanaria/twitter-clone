import SideBarContainer from "@/components/SideBar/SIdeBarContainer";
import FeedContainer from "@/components/Feed/FeedContainer";
import WidgetsContainer from "@/components/Widgets/WidgetsContainer";

export default function Home() {
  return (
    <>
      <SideBarContainer />
      <main className="sm:ml-20 xl:ml-72 flex-grow max-w-xl xl:min-w-[576px] border-r border-l border-gray-200">
        <FeedContainer />
      </main>
      <WidgetsContainer />
    </>
  );
}
