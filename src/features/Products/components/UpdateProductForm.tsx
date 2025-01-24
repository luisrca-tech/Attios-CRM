"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/common/components/ui/Button";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import type { products } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { useUploadThing } from "~/utils/storage";
import { useProduct } from "../hooks/useProduct";
import { updateProductSchema } from "../schemas/updateProduct.schema";
import type { UpdateProduct } from "../types/updateProduct.type";
import { ProductImageCarousel } from "./ProductImageCarousel";

interface UpdateProductFormProps {
  product: typeof products.$inferSelect & {
    category: { name: string };
  } & {
    productImages: {
      url: string;
      key: string;
    }[];
  };
}

export const UpdateProductForm = ({ product }: UpdateProductFormProps) => {
  const categoryName = product.category?.name;

  const productImages = product.productImages;

  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [images, setImages] = useState<typeof productImages>(productImages);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    setValue,
  } = useForm<UpdateProduct>({
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
      productImages: productImages,
    },
  });

  const {
    createCategory,
    filteredCategories,
    setCategorySearch: onSearchCategory,
    updateProduct,
  } = useProduct();
  const { startUpload } = useUploadThing("imageUploader");
  const imageCreation = api.images.uploadImage.useMutation();

  const handleAddCategory = (value: string) => {
    createCategory.mutate({ name: value });
    return toast.success("Category added");
  };

  const onSubmit = async (values: UpdateProduct) => {
    try {
      let uploadedImages: { url: string; key: string }[] =
        values?.productImages ?? [];
      const existingImages = uploadedImages.filter(
        (img) => !img.url.startsWith("blob:")
      );

      if (filesToUpload.length > 0) {
        const uploadResponse = await startUpload(filesToUpload);
        if (!uploadResponse) {
          toast.error("Failed to upload images");
          return;
        }
        uploadedImages = [...existingImages, ...uploadResponse];

        setImages(uploadedImages);
        setValue("productImages", uploadedImages, { shouldDirty: true });
      }

      if (uploadedImages.length > 0) {
        await imageCreation.mutateAsync({
          productId: values.productId,
          imageUrl: uploadedImages[0]?.url ?? "",
          imageKey: uploadedImages[0]?.key ?? "",
        });
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
        productImages: uploadedImages,
      });

      toast.success("Product updated successfully");
    } finally {
      reset();
      setFilesToUpload([]);
      setValue("productImages", productImages);
    }
  };

  const handleCancel = () => {
    reset();
    setFilesToUpload([]);
    setValue("productImages", productImages);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col pb-12 lg:pb-0"
    >
      <div className="lg:-mr-6 flex-1 overflow-y-auto lg:pr-6">
        <div className="flex flex-col gap-6">
          <div className="flex w-full max-w-screen-2xl flex-col rounded-xl bg-white-100">
            <ProductImageCarousel
              images={images}
              productId={product.id}
              onImagesChange={(images) => {
                setImages(images);
                setValue("productImages", images, { shouldDirty: true });
              }}
              onFilesChange={(files) => setFilesToUpload(files)}
            />
            {errors.productImages && (
              <ErrorMessage>{errors.productImages.message}</ErrorMessage>
            )}
          </div>
          <div className="flex flex-col gap-3 rounded-md bg-white-100 px-3 py-[1.375rem] lg:rounded-none lg:bg-transparent lg:p-0">
            <div className="flex w-full flex-col gap-1">
              <Input.Root fieldText="Product's name">
                <Input.Text
                  {...register("name")}
                  className="px-0"
                  renderIconRight={() => <Icon.Shop fill="#1C1D21" />}
                />
              </Input.Root>
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>
            <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-[1.875rem]">
              <div className="flex w-full flex-col gap-1">
                <Input.Root
                  className="w-full"
                  fieldText="Sku"
                >
                  <Input.Text
                    {...register("sku")}
                    className="px-0"
                    placeholder="Start typing..."
                    renderIconRight={() => <Icon.Shipping fill="#8181A5" />}
                  />
                </Input.Root>
                {errors.sku && (
                  <ErrorMessage>{errors.sku.message}</ErrorMessage>
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <Input.Root
                  className="w-full"
                  fieldText="Available quantity"
                >
                  <Input.Text
                    {...register("availableQuantity", { valueAsNumber: true })}
                    className="px-0"
                    placeholder="Start typing..."
                    renderIconRight={() => <Icon.Garage fill="#8181A5" />}
                  />
                </Input.Root>
                {errors.availableQuantity && (
                  <ErrorMessage>
                    {errors.availableQuantity.message}
                  </ErrorMessage>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-[1.875rem]">
              <div className="flex w-full flex-col gap-1">
                <Input.Root
                  className="w-full"
                  fieldText="Price"
                >
                  <Input.Text
                    {...register("price", { valueAsNumber: true })}
                    className="px-0"
                    placeholder="Start typing..."
                    renderIconRight={() => <Icon.Wallet fill="#1C1D21" />}
                  />
                </Input.Root>
                {errors.price && (
                  <ErrorMessage>{errors.price.message}</ErrorMessage>
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <Input.Root
                  className="w-full"
                  fieldText="Currency"
                >
                  <Input.SelectInput
                    {...register("currency")}
                    text="USD"
                    options={["USD", "BRL", "EUR"]}
                    onSearch={() => {}}
                    onChange={() => {}}
                    onAdd={() => {}}
                  />
                </Input.Root>
                {errors.currency && (
                  <ErrorMessage>{errors.currency.message}</ErrorMessage>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-[1.875rem]">
              <div className="flex w-full flex-col gap-1">
                <Input.Root
                  className="w-full"
                  fieldText="Category"
                >
                  <Input.SelectInput
                    {...register("category")}
                    text={categoryName ?? "Select category"}
                    options={filteredCategories}
                    onSearch={onSearchCategory}
                    onChange={(value) => {
                      setValue("category", value, { shouldDirty: true });
                    }}
                    onAdd={handleAddCategory}
                  />
                </Input.Root>
                {errors.category && (
                  <ErrorMessage>{errors.category.message}</ErrorMessage>
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <Input.Root
                  className="w-full"
                  fieldText="Subcategory"
                >
                  <Input.SelectInput
                    {...register("subcategory")}
                    text="Select subcategory"
                    options={filteredCategories}
                    onSearch={onSearchCategory}
                    onChange={(value) => {
                      setValue("subcategory", value, { shouldDirty: true });
                    }}
                    onAdd={handleAddCategory}
                  />
                </Input.Root>
                {errors.subcategory && (
                  <ErrorMessage>{errors.subcategory.message}</ErrorMessage>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[0.375rem] pt-6">
        <Button
          type="submit"
          className="w-[10.75rem]"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? "Updating..." : "Update Settings"}
        </Button>
        <Button
          type="button"
          color="secondary"
          className="w-32"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
