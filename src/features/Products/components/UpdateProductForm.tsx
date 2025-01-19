'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/common/components/ui/Button";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import type { products } from "~/server/db/schema";
import { useUploadThing } from "~/utils/storage";
import { useProduct } from "../hooks/useProduct";
import { updateProductSchema } from "../schemas/updateProduct.schema";
import type { UpdateProduct } from "../types/updateProduct.type";
import { ProductImageCarousel } from "./ProductImageCarousel";

interface UpdateProductFormProps {
  product: typeof products.$inferSelect & { 
    category: { name: string } 
  } & { 
    productImages: { 
      url: string;
      key: string;
    }[] 
  }
}

export const UpdateProductForm = ({ product }: UpdateProductFormProps) => {
  const categoryName = product.category?.name;
  
  const productImages = product.productImages.map(image => ({
    url: image.url,
    key: image.key,
  }));
  
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty }, reset, setValue } = useForm<UpdateProduct>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      productId: product.id,
      name: product.name,
      sku: product.sku ?? "",
      availableQuantity: product.quantity ?? 0,
      price: Number(product.listPrice) ?? 0,
      currency: "USD",
      category: categoryName ?? "",
      subcategory: product.subcategory ?? "",
      productImages: productImages.map(image => ({ url: image.url, key: image.key }))
    }
  });

  const { createCategory, filteredCategories, setCategorySearch: onSearchCategory, updateProduct } = useProduct();
  const { startUpload } = useUploadThing("imageUploader");

  const handleAddCategory = (value: string) => {
    createCategory.mutate({ name: value });
    return toast.success('Category added');
  }

  const onSubmit = async (values: UpdateProduct) => {
    try {
      let uploadedImages = values?.productImages?.map(image => ({ url: image.url, key: image.key })) ?? [];
      
      if (filesToUpload.length > 0) {
        const uploadResponse = await startUpload(filesToUpload);
        if (!uploadResponse) {
          toast.error('Failed to upload images');
          return;
        }
        uploadedImages = [...uploadedImages, ...uploadResponse.map(file => ({ url: file.url, key: file.key }))];
      }

      await updateProduct.mutateAsync({
        productId: values.productId,
        name: values.name,
        sku: values.sku,
        price: values.price,
        availableQuantity: values.availableQuantity,
        category: values.category,
        subcategory: values.subcategory,
        currency: values.currency,
        productImages: uploadedImages.map(image => ({ url: image.url, key: image.key }))
      });
      
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    }
  }

  const handleCancel = () => {
    reset();
    setFilesToUpload([]);
    setValue('productImages', productImages.map(image => ({ url: image.url, key: image.key})));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col pb-12 lg:pb-0">
      <div className="flex-1 overflow-y-auto lg:pr-6 lg:-mr-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white-100 rounded-xl w-full flex flex-col max-w-screen-2xl">
            <ProductImageCarousel 
              productImages={productImages}
              onImagesChange={images => setValue('productImages', images?.map(image => ({ 
                url: typeof image.url === 'string' ? image.url : image.url.url, 
                key: image.key
              })), { shouldDirty: true })}
              onFilesChange={files => setFilesToUpload(files)}
            />
            {errors.productImages && <ErrorMessage children={errors.productImages.message} />}
          </div>
          <div className="flex flex-col gap-3 px-3 py-[1.375rem] lg:p-0 bg-white-100 lg:bg-transparent rounded-md lg:rounded-none">
            <div className="flex flex-col gap-1 w-full">
              <Input.Root fieldText="Product's name">
                <Input.Text {...register('name')} className="px-0" renderIconRight={() => <Icon.Shop fill="#1C1D21" />} />
              </Input.Root>
              {errors.name && <ErrorMessage children={errors.name.message} />}
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-[1.875rem] w-full">
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
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-[1.875rem] w-full">
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
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-[1.875rem] w-full">
              <div className="flex flex-col gap-1 w-full">
              <Input.Root className="w-full" fieldText="Category">
                <Input.SelectInput 
                  {...register('category')} 
                  text={categoryName ?? "Select category"}
                  options={filteredCategories} 
                  onSearch={onSearchCategory} 
                  onChange={(value) => {
                    setValue('category', value, { shouldDirty: true });
                  }} 
                  onAdd={handleAddCategory} 
                />
              </Input.Root>
              {errors.category && <ErrorMessage children={errors.category.message} />}
              </div>
              <div className="flex flex-col gap-1 w-full">
              <Input.Root className="w-full" fieldText="Subcategory">
                  <Input.SelectInput 
                    {...register('subcategory')} 
                    text="Select subcategory"
                    options={filteredCategories} 
                    onSearch={onSearchCategory} 
                    onChange={(value) => {
                      setValue('subcategory', value, { shouldDirty: true });
                    }} 
                    onAdd={handleAddCategory} 
                  />
                </Input.Root>
                {errors.subcategory && <ErrorMessage children={errors.subcategory.message} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[0.375rem] pt-6">
        <Button type="submit" className="w-[10.75rem]" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Updating...' : 'Update Settings'}
        </Button>
        <Button type="button" color="secondary" className="w-32" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
