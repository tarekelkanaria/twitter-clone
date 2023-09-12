import SideBarContainer from "@/components/SideBar/SIdeBarContainer";
import WidgetsContainer from "@/components/Widgets/WidgetsContainer";
import CommentModal from "@/components/Modals/CommentModal";
import LikesModal from "@/components/Modals/LikesModal";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBarContainer />
      <main className="sm:ml-20 xl:ml-72 flex-grow max-w-xl xl:min-w-[576px] border-r border-l border-gray-200">
        {children}
      </main>
      <WidgetsContainer />
      <div id="modals">
        <CommentModal />
        <LikesModal />
      </div>
    </>
  );
}
