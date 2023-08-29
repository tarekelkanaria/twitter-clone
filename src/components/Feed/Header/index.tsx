import { HiOutlineSparkles } from "react-icons/hi";

export default function Header() {
  return (
    <header className="py-2 px-3 flex justify-between items-center sticky top-0 z-10 bg-white border-b border-gray-200">
      <h2 className="font-bold text-lg sm:text-xl cursor-pointer">Home</h2>
      <div className="hover-effect w-10 h-10 flex justify-center items-center xl:p-0">
        <HiOutlineSparkles className="text-2xl" />
      </div>
    </header>
  );
}
