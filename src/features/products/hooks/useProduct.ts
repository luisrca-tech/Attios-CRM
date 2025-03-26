import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export const useProduct = () => {
  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const getAllCategories = api.category.getAll.useQuery();
  const getAllBrands = api.brand.getAll.useQuery();
  const categories = getAllCategories.data?.map((cat) => cat.name) ?? [];
  const brands = getAllBrands.data?.map((brand) => brand.name) ?? [];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const trpcUtils = api.useUtils();

  const createCategory = api.category.create.useMutation({
    onMutate: async (data) => {
      const newCategory = {
        id: Math.random(),
        name: data.name,
        products: [],
      };
      await trpcUtils.category.getAll.cancel();

      trpcUtils.category.getAll.setData(undefined, (old) => {
        if (!old) return [newCategory];
        return [...old, newCategory];
      });

      return { newCategory };
    },
    onError: (_err, _variables, ctx) => {
      toast.error("Something went wrong");
      trpcUtils.category.getAll.setData(
        undefined,
        ctx?.newCategory ? [ctx.newCategory] : []
      );
    },
    onSettled: async () => {
      await Promise.all([trpcUtils.category.getAll.invalidate()]);
      return toast.success("Category added");
    },
  });

  const createBrand = api.brand.create.useMutation({
    onMutate: async (data) => {
      const newBrand = {
        id: Math.random(),
        name: data.name,
        products: [],
      };
      await trpcUtils.brand.getAll.cancel();

      trpcUtils.brand.getAll.setData(undefined, (old) => {
        if (!old) return [newBrand];
        return [...old, newBrand];
      });

      return { newBrand };
    },
    onError: (_err, _variables, ctx) => {
      toast.error("Something went wrong");
      trpcUtils.brand.getAll.setData(
        undefined,
        ctx?.newBrand ? [ctx.newBrand] : []
      );
    },
    onSettled: async () => {
      await Promise.all([trpcUtils.brand.getAll.invalidate()]);
      return toast.success("Brand added");
    },
  });

  const createProduct = api.product.create.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateProduct = api.product.update.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteProduct = api.product.delete.useMutation({
    onSuccess: () => {
      trpcUtils.product.getProductsPaginated.invalidate();
      trpcUtils.product.getControlledProductsInfinite.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createCategory,
    createProduct,
    createBrand,
    filteredCategories,
    filteredBrands,
    setCategorySearch,
    setBrandSearch,
    updateProduct,
    deleteProduct,
  };
};
