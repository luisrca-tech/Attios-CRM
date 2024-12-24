import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/common/components/ui/Button";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import { api } from "~/trpc/react";
import { useProduct } from "../hooks/useProduct";
import { newProductSchema } from "../schemas/newProduct.schema";
import type { NewProduct } from "../types/newProduct.type";

export function NewProductForm() {
  const { register, handleSubmit, reset, setValue, formState: { errors, isLoading } } = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      price: 0,
      availableQuantity: 0,
      category: '',
    }
  });
  const [categorySearch, setCategorySearch] = useState('');
  const getAllCategories = api.category.getAll.useQuery();
  const { createCategory } = useProduct();

  const handleAddCategory = (value: string) => {
    createCategory.mutate({ name: value });
    return toast.success('Category added');
  }
  
  const categories = getAllCategories.data?.map(cat => cat.name) ?? [];
  
  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );


  const onSubmit = (data: NewProduct) => {
    console.log(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[0.875rem] mt-[2.625rem]">
        <div className="flex items-center justify-center mb-[1.6875rem]">
        <Button className="p-9 flex items-center justify-center rounded-xl bg-primary-100/10">
          <Icon.Upload />
        </Button>
        </div>
        <div className="flex flex-col gap-[0.875rem]">
          <div className="flex flex-col gap-2 w-full">
            <Input.Root fieldText="Product's name">
            <Input.Text {...register('name')} className="px-0" placeholder="Start typing..." renderIconRight={() => <Icon.Sidebar.Products />} />
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
                    onSearch={setCategorySearch} 
                    {...register('category')}
                    onChange={(value) => setValue('category', value)}
                    onAdd={handleAddCategory}
                  />
                </div>
            </Input.Root>
            {errors.category && <ErrorMessage children={errors.category.message} />}
            </div>
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