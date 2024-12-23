import { toast } from "sonner";
import { api } from "~/trpc/react";

export const useProduct = () => {
  const trpcUtils = api.useUtils();

  const createCategory = api.category.create.useMutation({
    onMutate: async (data) => {
      const newCategory = {
       ...data
      }
      await trpcUtils.category.getAll.cancel();

      trpcUtils.category.getAll.setData(undefined, (old) => {
        if (!old) return [newCategory];
        return [...old, newCategory];
      });

      return { newCategory };
    },
    onError: (_err, _variables, ctx) => {
      toast.error('Something went wrong');
      trpcUtils.category.getAll.setData(undefined, ctx?.newCategory ? [ctx.newCategory] : [])
    },
    onSettled: async () => {
      await Promise.all([
        trpcUtils.category.getAll.invalidate(),
      ]);
    }
  });

  return { createCategory };
}
