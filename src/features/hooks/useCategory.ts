import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useCategory() {
  const [categorySearch, setCategorySearch] = useState("");
  const trpcUtils = api.useUtils();
  const getAllCategories = api.category.getAll.useQuery();
  const categories = getAllCategories.data?.map((cat) => cat.name) ?? [];
  const filteredCategories = categories
    .filter((category) =>
      category.toLowerCase().includes(categorySearch.toLowerCase())
    )
    .slice(0, categorySearch ? undefined : 5);

  const createCategory = api.category.create.useMutation({
    onMutate: async (data) => {
      const newCategory = {
        id: Math.random(),
        name: data.name,
        products: [] as { id: number; name: string }[],
        createdAt: new Date(),
        updatedAt: new Date(),
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
      trpcUtils.category.getAll.setData(undefined, () =>
        ctx?.newCategory ? [ctx.newCategory] : []
      );
    },
    onSettled: async () => {
      await Promise.all([trpcUtils.category.getAll.invalidate()]);
      return toast.success("Category added");
    },
  });

  const handleAddCategory = (value: string) => {
    createCategory.mutate({ name: value });
  };

  return { handleAddCategory, setCategorySearch, filteredCategories };
}
