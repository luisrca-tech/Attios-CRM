'use client';

import Image from "next/image";
import { toast } from "sonner";
import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import { products } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { useProduct } from "../hooks/useProduct";

export const UpdateProductForm = ({ product }: { product: typeof products.$inferSelect }) => {
  const category = api.product.getById.useQuery(product.id);
  const { createCategory, filteredCategories, setCategorySearch: onSearchCategory } = useProduct();

  const handleAddCategory = (value: string) => {
    createCategory.mutate({ name: value });
    return toast.success('Category added');
  }

  return (
    <form className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-6">
      <div className="bg-white-100 rounded-xl w-full">
        <div className="flex rounded-xl items-center justify-start gap-2 p-4 border border-primary-200 border-dashed">
          <Image className="rounded-lg" src={product.productImage ?? "/placeholder-product.jpg"} alt={product.name} width={174} height={174} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
      <Input.Root fieldText="Product`s name">
        <Input.Text className="px-0" value={product.name} placeholder={product.name} renderIconRight={() => <Icon.Shop fill="#1C1D21" />} />
      </Input.Root>
      <div className="flex gap-[1.875rem] w-full">
        <Input.Root className="w-full" fieldText="Sku">
          <Input.Text className="px-0" value={product.sku ?? ""} placeholder="Start typing..." renderIconRight={() => <Icon.Shipping fill="#8181A5" />} />
        </Input.Root>
        <Input.Root className="w-full" fieldText="Available quantity">
          <Input.Text className="px-0" value={product.quantity ?? ""} placeholder="Start typing..." renderIconRight={() => <Icon.Garage fill="#8181A5" />} />
        </Input.Root>
      </div>
      <div className="flex gap-[1.875rem] w-full">
        <Input.Root className="w-full" fieldText="Price">
          <Input.Text className="px-0" value={product.listPrice ?? ""} placeholder="Start typing..." renderIconRight={() => <Icon.Wallet fill="#1C1D21" />} />
        </Input.Root>
        <Input.Root className="w-full" fieldText="Currency">
          <Input.SelectInput text="USD" options={['USD', 'BRL', 'EUR']} onSearch={() => {}} onChange={() => {}} onAdd={() => {}} />
        </Input.Root>
      </div>
      <div className="flex gap-[1.875rem] w-full">
        <Input.Root className="w-full" fieldText="Category">
          <Input.SelectInput text={category.data?.category?.name ?? "Select category"} options={filteredCategories} onSearch={onSearchCategory} onChange={() => {}} onAdd={handleAddCategory} />
        </Input.Root>
        <Input.Root className="w-full" fieldText="Subcategory">
          <Input.SelectInput text={category.data?.category?.name ?? "Select subcategory"} options={filteredCategories} onSearch={onSearchCategory} onChange={() => {}} onAdd={handleAddCategory} />
        </Input.Root>
      </div>
      <Input.Root fieldText="Item location">
        <Input.Text className="px-0" placeholder="Select store location" renderIconRight={() => <Icon.Earth fill="#8181A5" />} />
      </Input.Root>
      </div>
      </div>
      <div className="flex gap-[0.375rem]">
         <Button className="w-[10.75rem]">
          Update Settings
         </Button>
         <Button color="secondary" className="w-32">
          Cancel
         </Button>
      </div>
    </form>
  );
};
