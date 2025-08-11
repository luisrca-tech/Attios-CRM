import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useBrand() {
  const [brandSearch, setBrandSearch] = useState("");
  const trpcUtils = api.useUtils();

  const getAllBrands = api.brand.getAll.useQuery();
  const brands = getAllBrands.data?.map((brand) => brand.name) ?? [];

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const createBrand = api.brand.create.useMutation({
    onMutate: async (data) => {
      const newBrand = {
        id: Math.random(),
        name: data.name,
        products: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await trpcUtils.brand.getAll.cancel();
      const previousBrands = trpcUtils.brand.getAll.getData();

      trpcUtils.brand.getAll.setData(undefined, (old) => {
        if (!old) return [newBrand];
        return [...old, newBrand];
      });

      return { previousBrands };
    },
    onError: (_err, _variables, ctx) => {
      toast.error("Something went wrong");
      trpcUtils.brand.getAll.setData(undefined, ctx?.previousBrands);
    },
    onSettled: async () => {
      await Promise.all([trpcUtils.brand.getAll.invalidate()]);
      return toast.success("Brand added");
    },
  });

  const handleAddBrand = (value: string) => {
    createBrand.mutate({ name: value });
  };

  return {
    handleAddBrand,
    filteredBrands,
    setBrandSearch,
  };
}
