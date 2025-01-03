import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/common/components/ui/Button";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import { UploadButton, useUploadThing } from "~/utils/uploadthing";
import { useProduct } from "../hooks/useProduct";
import { newProductSchema } from "../schemas/newProduct.schema";
import type { NewProduct } from "../types/newProduct.type";

export function NewProductForm() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isLoading } } = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      price: 0,
      availableQuantity: 0,
      category: '',
      brand: '',
    }
  });
  
  const file = watch('file');
  const { createCategory, createProduct, createBrand, filteredCategories, filteredBrands, setCategorySearch: onSearchCategory, setBrandSearch: onSearchBrand } = useProduct();

  const { startUpload } = useUploadThing("imageUploader");

  const handleAddCategory = (value: string) => {
    createCategory.mutate({ name: value });
    return toast.success('Category added');
  }

  const handleAddBrand = (value: string) => {
    createBrand.mutate({ name: value });
    return toast.success('Brand added');
  }

  const handleFileSelect = (file: File) => {
    setValue('file', file);
  }

  const onSubmit = async (values: NewProduct) => {
    try {
      if (!values.file) {
        toast.error('Please select an image');
        return;
      }

      const uploadResponse = await startUpload([values.file]);
      if (!uploadResponse?.[0]) {
        toast.error('Failed to upload image');
        return;
      }

      await createProduct.mutateAsync({
        name: values.name,
        sku: values.sku,
        price: values.price,
        availableQuantity: values.availableQuantity,
        category: values.category,
        brand: values.brand,
        productImage: uploadResponse[0].url
      });

      toast.success('Product created successfully');
      reset();
    } catch (error) {
      toast.error('Failed to create product');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[0.875rem] mt-[2.625rem]">
        <div className="flex items-center justify-center mb-[1.6875rem]">
          <div className="flex flex-col gap-2">
            {file ? (
              <div className="relative">
                <Image 
                  src={URL.createObjectURL(file)} 
                  alt="Product preview" 
                  width={144} 
                  height={144} 
                  className="rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => setValue('file', undefined)}
                  className="absolute -top-2 -right-2 p-1 bg-white-100 rounded-full shadow-md hover:bg-gray-50"
                >
                  <Icon.CloseButton className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <UploadButton
                endpoint="imageUploader"
                onChange={(files) => {
                  if (files?.[0]) {
                    handleFileSelect(files[0]);
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`ERROR! ${error.message}`);
                }}
                appearance={{
                  button: "p-9 h-[9rem] flex items-center justify-center rounded-xl bg-primary-100/10"
                }}
                content={{
                  button: <Icon.Upload />
                }}
              />
            )}
            {errors.file && <ErrorMessage children={errors.file.message} />}
          </div>
        </div>
        <div className="flex flex-col gap-[0.875rem]">
          <div className="flex flex-col gap-2 w-full">
            <Input.Root fieldText="Product's name">
              <Input.Text {...register('name')} className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Sidebar.Products className="h-[1.125rem] w-[1.125rem]" fill="#8181A5" />} />
            </Input.Root>
            {errors.name && <ErrorMessage children={errors.name.message} />}
          </div>
          <div className="flex gap-[1.875rem] w-full">
            <div className="flex flex-col gap-2 w-full">
              <Input.Root className="w-full" fieldText="Sku">
                <Input.Text className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Sku />} {...register('sku')} />
              </Input.Root>
              {errors.sku && <ErrorMessage children={errors.sku.message} />}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Input.Root className="w-full" fieldText="Available quantity">
                <Input.Text 
                  type="number" 
                  className="px-0" 
                  placeholder="Start typing..." 
                  renderIconRight={() => <Icon.Garage />} 
                  {...register('availableQuantity', { valueAsNumber: true })} 
                />
              </Input.Root>
              {errors.availableQuantity && <ErrorMessage children={errors.availableQuantity.message} />}
            </div>
          </div>
          <div className="flex gap-[1.875rem] w-full">
            <div className="flex flex-col gap-2 w-full">
              <Input.Root className="w-full" fieldText="Price">
                <Input.Text 
                  type="number" 
                  className="px-0" 
                  placeholder="Start typing..." 
                  renderIconRight={() => <Icon.Wallet />} 
                  {...register('price', { valueAsNumber: true })} 
                />
              </Input.Root>
              {errors.price && <ErrorMessage children={errors.price.message} />}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Input.Root className="w-full" fieldText="Category">
                <div className="flex-1">
                  <Input.SelectInput
                    text="Select category" 
                    options={filteredCategories}
                    onSearch={onSearchCategory} 
                    {...register('category')}
                    onChange={(value) => setValue('category', value)}
                    onAdd={handleAddCategory}
                  />
                </div>
              </Input.Root>
              {errors.category && <ErrorMessage children={errors.category.message} />}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Input.Root className="w-[16.8125rem]" fieldText="Brand">
              <div className="flex-1 w-full">
                <Input.SelectInput
                  text="Select brand" 
                  options={filteredBrands}
                  onSearch={onSearchBrand} 
                  {...register('brand')}
                  onChange={(value) => setValue('brand', value)}
                  onAdd={handleAddBrand}
                />
              </div>
            </Input.Root>
            {errors.brand && <ErrorMessage children={errors.brand.message} />}
          </div>
        </div>
        <div className="flex justify-between mt-[1.6875rem]">
          <Button type="button" className="bg-white-200 text-primary-200 hover:bg-secondary-300">Cancel</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Add & Proceed'}
          </Button>
        </div>
      </div>
    </form>
  )
}