import { MenuItemPropsType } from "@/types";

export default function MenuItem({ text, Icon, active }: MenuItemPropsType) {
  return (
    <div className="hover-effect text-gray-700 flex items-center justify-center xl:justify-start xl:space-x-3 ">
      <Icon className="text-3xl" />
      <h3 className={`text-lg hidden xl:inline-flex ${active && "font-bold"}`}>
        {text}
      </h3>
    </div>
  );
}
