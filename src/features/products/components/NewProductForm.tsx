"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { selectedAddAction } from "~/common/atoms/selected-add-action";
import { Button } from "~/common/components/ui/Button";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import { useIsLargeScreen } from "~/common/hooks/useMediaQuery";
import { useUploadThing } from "~/utils/storage";
import { useProduct } from "../hooks/useProduct";
import { newProductSchema } from "../schemas/newProduct.schema";
import type { NewProduct } from "../types/newProduct.type";
import { api } from "~/trpc/react";
import { useCategory } from "~/features/hooks/useCategory";
import { useBrand } from "~/features/hooks/useBrand";
import { useRouter } from "next/navigation";

export function NewProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      price: 0,
      availableQuantity: 0,
      category: "",
      brand: "",
      productImages: [],
    },
  });

  const router = useRouter();
  const file = watch("file");
  const imageCreation = api.images.upload.useMutation();
  const { startUpload } = useUploadThing("imageUploader");

  const { createProduct } = useProduct();

  const {
    filteredBrands,
    setBrandSearch: onSearchBrand,
    handleAddBrand,
  } = useBrand();

  const {
    filteredCategories,
    setCategorySearch: onSearchCategory,
    handleAddCategory,
  } = useCategory();

  const [, setSelectedModal] = useAtom(selectedAddAction);

  const handleFileSelect = (file: File) => {
    setValue("file", file);
  };

  const onSubmit = async (values: NewProduct) => {
    try {
      if (!values.file) {
        toast.error("Please select an image");
        return;
      }

      const uploadResponse = await startUpload([values.file]);
      if (!uploadResponse?.[0]) {
        toast.error("Failed to upload image");
        return;
      }

      const product = await createProduct.mutateAsync({
        name: values.name,
        sku: values.sku,
        price: values.price,
        availableQuantity: values.availableQuantity,
        category: values.category,
        brand: values.brand,
        productImages: [
          {
            url: uploadResponse[0].ufsUrl,
            key: uploadResponse[0].key,
          },
        ],
      });

      if (!product?.[0]) {
        toast.error("Failed to create product");
        return;
      }

      await imageCreation.mutateAsync({
        productId: product[0].id,
        imageUrl: uploadResponse[0].ufsUrl,
        imageKey: uploadResponse[0].key,
      });
      setSelectedModal(null);
      router.push(`/product/${product[0].id}`);
    } catch (_error) {
      toast.error("Failed to create product");
    }
  };

  const isDesktop = useIsLargeScreen();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6 flex max-h-[calc(100vh-12rem)] flex-col gap-[0.875rem] overflow-y-auto lg:mt-[2.625rem] lg:max-h-none lg:overflow-visible">
        <div className="mb-6 flex items-center justify-center lg:mb-[1.6875rem]">
          <div className="flex flex-col gap-2">
            {file ? (
              <div className="relative flex items-center justify-center">
                <div className="h-36 w-36">
                  <Image
                    data-testid="product-image-preview"
                    src={URL.createObjectURL(file)}
                    width={144}
                    height={144}
                    alt="Product preview"
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setValue("file", undefined)}
                  className="absolute top-0 right-10 rounded-full bg-white-100 p-1 shadow-md hover:bg-gray-50 lg:top-0 lg:right-0"
                >
                  <Icon.CloseButton className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="absolute inset-0 flex h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-xl bg-white-100 p-9 lg:h-[6.5rem] lg:w-[6.5rem] lg:bg-primary-100/10">
                  <Icon.Upload
                    className="h-[1.125rem] w-[1.125rem] text-primary-200 lg:h-8 lg:w-8 lg:text-primary-100"
                    fill={isDesktop ? "#1B51E5" : "#8181A5"}
                  />
                </div>
              </div>
            )}
            {errors.file && (
              <ErrorMessage>{errors.file.message?.toString()}</ErrorMessage>
            )}
            <div className="flex flex-col items-center justify-center lg:hidden">
              <strong className="text-xl leading-8">
                Type new products name
              </strong>
              {/* TODO: What is this date? */}
              <p className="font-normal text-primary-200 text-xs leading-5">
                Created on 07 jun 2019
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[0.875rem] rounded-md bg-white-100 px-3 py-[1.375rem] lg:rounded-none lg:bg-transparent lg:px-0">
          <div className="flex w-full flex-col gap-2">
            <Input.Root fieldText="Product's name">
              <Input.Text
                {...register("name")}
                data-testid="product-name-input"
                className="px-0"
                placeholder="Start typing..."
                renderIconRight={() => (
                  <Icon.Sidebar.Products
                    className="h-[1.125rem] w-[1.125rem]"
                    fill="#8181A5"
                  />
                )}
              />
            </Input.Root>
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-[1.875rem]">
            <div className="flex w-full flex-col gap-2">
              <Input.Root
                className="w-full"
                fieldText="Sku"
              >
                <Input.Text
                  data-testid="product-sku-input"
                  className="px-0"
                  placeholder="Start typing..."
                  renderIconRight={() => <Icon.Sku />}
                  {...register("sku")}
                />
              </Input.Root>
              {errors.sku && <ErrorMessage>{errors.sku.message}</ErrorMessage>}
            </div>
            <div className="flex w-full flex-col gap-2">
              <Input.Root
                className="w-full"
                fieldText="Available quantity"
              >
                <Input.Text
                  data-testid="product-available-quantity-input"
                  type="number"
                  className="px-0"
                  placeholder="Start typing..."
                  renderIconRight={() => <Icon.Garage />}
                  {...register("availableQuantity", { valueAsNumber: true })}
                />
              </Input.Root>
              {errors.availableQuantity && (
                <ErrorMessage>{errors.availableQuantity.message}</ErrorMessage>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-[1.875rem]">
            <div className="flex w-full flex-col gap-2">
              <Input.Root
                className="w-full"
                fieldText="Price"
              >
                <Input.Text
                  data-testid="product-price-input"
                  type="number"
                  className="px-0"
                  placeholder="Start typing..."
                  renderIconRight={() => <Icon.Wallet />}
                  {...register("price", { valueAsNumber: true })}
                />
              </Input.Root>
              {errors.price && (
                <ErrorMessage>{errors.price.message}</ErrorMessage>
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <Input.Root
                className="w-full"
                fieldText="Category"
              >
                <div className="flex-1">
                  <Input.SelectInput
                    data-testid="product-category-input"
                    text="Select category"
                    options={filteredCategories}
                    onSearch={onSearchCategory}
                    {...register("category")}
                    onChange={(value) => setValue("category", value)}
                    onAdd={handleAddCategory}
                  />
                </div>
              </Input.Root>
              {errors.category && (
                <ErrorMessage>{errors.category.message}</ErrorMessage>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Input.Root
              className="w-full lg:w-[16.8125rem]"
              fieldText="Brand"
            >
              <div className="w-full flex-1">
                <Input.SelectInput
                  data-testid="product-brand-input"
                  text="Select brand"
                  options={filteredBrands}
                  onSearch={onSearchBrand}
                  {...register("brand")}
                  onChange={(value) => setValue("brand", value)}
                  onAdd={handleAddBrand}
                />
              </div>
            </Input.Root>
            {errors.brand && (
              <ErrorMessage>{errors.brand.message}</ErrorMessage>
            )}
          </div>
        </div>
        <div className="mt-6 hidden justify-between lg:mt-[1.6875rem] lg:flex">
          <Button
            type="button"
            onClick={() => reset()}
            className="bg-white-200 text-primary-200 hover:bg-secondary-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Add & Proceed"}
          </Button>
        </div>
        <Button
          data-testid="product-create-button"
          type="submit"
          disabled={isSubmitting}
          className="w-full lg:hidden"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
