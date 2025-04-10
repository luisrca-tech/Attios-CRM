"use client";

import { Icon } from "~/common/components/ui/Icons/_index";
import { productActionItems } from "../constants/productActionItems";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { Product } from "../types/product.type";
import { useState } from "react";
import { DeleteConfirmationModal } from "~/common/components/ui/DeleteConfirmationModal";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { updateProductActiveStateAtom } from "../atoms/productAtoms";
import { useRouter } from "next/navigation";

export function ProductActions({ product }: { product: Product }) {
  const { mutate: toggleActive } = api.product.toggleActive.useMutation({
    onSuccess: () => {
      updateProductActiveState({ id: product.id, isActive: !product.isActive });
    },
    onError: () => {
      toast.error("Failed to update product status");
    },
  });

  const router = useRouter();
  const [, updateProductActiveState] = useAtom(updateProductActiveStateAtom);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleConfirmationModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleToggleActive = (id: string) => {
    const newActiveState = !product.isActive;
    updateProductActiveState({ id, isActive: newActiveState });

    toggleActive({ id });
    setIsOpenModal(false);
    router.refresh();

    if (product.isActive) {
      toast.success("Product desactivated successfully");
    } else {
      toast.success("Product activated successfully");
    }
  };

  return (
    <div className="hidden h-full flex-col justify-between lg:flex">
      <div className="flex max-h-[28.25rem] min-w-[21.75rem] flex-col justify-between rounded-xl border border-white-400">
        {productActionItems.map((item) => (
          <div
            key={item.text}
            className={cn(
              "flex gap-[1.3125rem] border-white-400 border-b px-8 py-[1.625rem] last:border-b-0",
              item.isDisabled && "opacity-50"
            )}
          >
            {item.icon("#8181A5")}
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="text-left font-bold text-black text-sm leading-4 hover:text-primary-100"
                disabled={item.isDisabled}
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
      {product.isActive ? (
        <div className="flex gap-[1.3125rem] rounded-xl border border-white-400 px-8 py-[1.625rem]">
          <Icon.Trash fill="#8181A5" />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={toggleConfirmationModal}
              className="text-left font-bold text-black text-sm leading-4 hover:text-secondary-300"
            >
              Desactivate product
            </button>
            {isOpenModal && (
              <DeleteConfirmationModal
                isOpen={isOpenModal}
                onConfirm={() => handleToggleActive(product.id)}
                onCancel={toggleConfirmationModal}
                title="Are you sure you want to desactivate this product?"
                type="delete"
              />
            )}
            <p className="text-primary-200 text-xs leading-[1.125rem]">
              Hide & disable current item
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-[1.3125rem] rounded-xl border border-white-400 px-8 py-[1.625rem]">
          <Icon.Check />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={toggleConfirmationModal}
              className="text-left font-bold text-black text-sm leading-4 hover:text-secondary-200"
            >
              Activate product
            </button>
            {isOpenModal && (
              <DeleteConfirmationModal
                type="activate"
                isOpen={isOpenModal}
                onConfirm={() => handleToggleActive(product.id)}
                onCancel={toggleConfirmationModal}
                title="Are you sure you want to activate this product?"
              />
            )}
            <p className="text-primary-200 text-xs leading-[1.125rem]">
              Show & activate current item
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
