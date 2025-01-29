import { Icon } from "~/common/components/ui/Icons/_index";
import { productActionItems } from "../constants/productActionItems";

export const ProductActions = () => {
  return (
    <div className="hidden h-full flex-col justify-between lg:flex">
      <div className="flex max-h-[28.25rem] min-w-[21.75rem] flex-col justify-between rounded-xl border border-white-400">
        {productActionItems.map((item) => (
          <div
            key={item.text}
            className="flex gap-[1.3125rem] border-white-400 border-b px-8 py-[1.625rem] last:border-b-0"
          >
            {item.icon("#8181A5")}
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="text-left font-bold text-black text-sm leading-4 hover:text-primary-100"
              >
                {item.text}
              </button>
              <p className="text-primary-200 text-xs leading-[1.125rem]">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-[1.3125rem] rounded-xl border border-white-400 px-8 py-[1.625rem]">
        <Icon.Trash fill="#8181A5" />
        <div className="flex flex-col gap-1">
          <button
            type="button"
            className="text-left font-bold text-black text-sm leading-4 hover:text-secondary-300"
          >
            Desactivate product
          </button>
          <p className="text-primary-200 text-xs leading-[1.125rem]">
            Hide & disable current item
          </p>
        </div>
      </div>
    </div>
  );
};
