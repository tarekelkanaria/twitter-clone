import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  return (
    <section className="w-11/12 xl:w-3/4 sticky top-0 py-3 bg-white z-10 group">
      <BiSearch className="text-xl absolute top-[1.35rem] left-3 text-gray-500 group-focus-within:text-sky-500" />
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-full indent-8 border-none bg-[#eff3f4] text-gray-700 focus:shadow-lg focus:bg-white focus:ring-1 focus:ring-sky-500 placeholder:text-gray-500"
      />
    </section>
  );
}
