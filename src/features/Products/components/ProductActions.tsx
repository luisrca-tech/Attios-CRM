import { Icon } from "~/common/components/ui/Icons/_index";
import { productActionItems } from "../constants/productActionItems";

export const ProductActions = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col justify-between border border-white-400 rounded-xl min-w-[21.75rem] max-h-[28.25rem]">
      {productActionItems.map((item) => (
        <div className="px-8 py-[1.625rem] flex gap-[1.3125rem] border-b border-white-400 last:border-b-0">
          {item.icon('#8181A5')}
          <div className="flex flex-col gap-1">
            <button className="text-sm leading-4 font-bold text-left text-black hover:text-primary-100">{item.text}</button>
            <p className="text-xs leading-[1.125rem] text-primary-200">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
      <div className="flex gap-[1.3125rem] px-8 py-[1.625rem] rounded-xl border border-white-400">
        <Icon.Trash fill="#8181A5" />
        <div className="flex flex-col gap-1">
          <button className="text-sm leading-4 font-bold text-left text-black hover:text-secondary-300">Desactivate product</button>
          <p className="text-xs leading-[1.125rem] text-primary-200">Hide & disable current item</p>
        </div>
      </div>
    </div>
  );
};
