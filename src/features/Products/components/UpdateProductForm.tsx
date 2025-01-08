'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/common/components/ui/Button";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import { products } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { useProduct } from "../hooks/useProduct";
import { updateProductSchema } from "../schemas/updateProduct.schema";
import type { UpdateProduct } from "../types/updateProduct.type";
import { ProductImageCarousel } from "./ProductImageCarousel";

export const UpdateProductForm = ({ product }: { product: typeof products.$inferSelect }) => {
  const category = api.product.getById.useQuery(product.id);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateProduct>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product.name,
      sku: product.sku ?? "",
      availableQuantity: product.quantity ?? 0,
      price: Number(product.listPrice) ?? 0,
      currency: "USD",
      category: category.data?.category?.name ?? "",
      subcategory: "",
      productImages: product.initialImage ? [product.initialImage] : []
    }
  });

  const { createCategory, filteredCategories, setCategorySearch: onSearchCategory } = useProduct();

  const handleAddCategory = (value: string) => {
    createCategory.mutate({ name: value });
    return toast.success('Category added');
  }

  const onSubmit = (data: UpdateProduct) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto pr-6 -mr-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white-100 rounded-xl w-full flex flex-col">
            <ProductImageCarousel 
              initialImages={product.initialImage ? [product.initialImage] : []}
              {...register('productImages')}
            />
            {errors.productImages && <ErrorMessage children={errors.productImages.message} />}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 w-full">
              <Input.Root fieldText="Product`s name">
                <Input.Text {...register('name')} className="px-0" renderIconRight={() => <Icon.Shop fill="#1C1D21" />} />
              </Input.Root>
              {errors.name && <ErrorMessage children={errors.name.message} />}
            </div>
            <div className="flex gap-[1.875rem] w-full">
              <div className="flex flex-col gap-1 w-full">
                <Input.Root className="w-full" fieldText="Sku">
                  <Input.Text {...register('sku')} className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Shipping fill="#8181A5" />} />
                </Input.Root>
                {errors.sku && <ErrorMessage children={errors.sku.message} />}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Input.Root className="w-full" fieldText="Available quantity">
                  <Input.Text {...register('availableQuantity', { valueAsNumber: true })}  className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Garage fill="#8181A5" />} />
                </Input.Root>
                {errors.availableQuantity && <ErrorMessage children={errors.availableQuantity.message} />}
              </div>
            </div>
            <div className="flex gap-[1.875rem] w-full">
               <div className="flex flex-col gap-1 w-full">
               <Input.Root className="w-full" fieldText="Price">
                  <Input.Text {...register('price', { valueAsNumber: true })}  className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Wallet fill="#1C1D21" />} />
                </Input.Root>
                {errors.price && <ErrorMessage children={errors.price.message} />}
               </div>
              <div className="flex flex-col gap-1 w-full">
              <Input.Root className="w-full" fieldText="Currency">
                <Input.SelectInput {...register('currency')} text="USD" options={['USD', 'BRL', 'EUR']} onSearch={() => {}} onChange={() => {}} onAdd={() => {}} />
                </Input.Root>
                {errors.currency && <ErrorMessage children={errors.currency.message} />}
              </div>
            </div>
            <div className="flex gap-[1.875rem] w-full">
              <div className="flex flex-col gap-1 w-full">
              <Input.Root className="w-full" fieldText="Category">
                <Input.SelectInput {...register('category')} text={category.data?.category?.name ?? "Select category"} options={filteredCategories} onSearch={onSearchCategory} onChange={() => {}} onAdd={handleAddCategory} />
              </Input.Root>
              {errors.category && <ErrorMessage children={errors.category.message} />}
              </div>
              <div className="flex flex-col gap-1 w-full">
              <Input.Root className="w-full" fieldText="Subcategory">
                  <Input.SelectInput {...register('subcategory')} text={"Select subcategory"} options={filteredCategories} onSearch={onSearchCategory} onChange={() => {}} onAdd={handleAddCategory} />
                </Input.Root>
                {errors.subcategory && <ErrorMessage children={errors.subcategory.message} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[0.375rem] pt-6">
        <Button className="w-[10.75rem]" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Settings'}
        </Button>
        <Button color="secondary" className="w-32">
          Cancel
        </Button>
      </div>
    </form>
  );
};
