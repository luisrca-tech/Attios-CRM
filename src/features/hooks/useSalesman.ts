import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useSalesman() {
  const [salesmanSearch, setSalesmanSearch] = useState("");
  const trpcUtils = api.useUtils();

  const getAllSalesmen = api.salesman.getAll.useQuery();
  const salesmen = getAllSalesmen.data?.map((s) => s.name) ?? [];

  const filteredSalesmen = salesmen
    .filter((s) => s.toLowerCase().includes(salesmanSearch.toLowerCase()))
    .slice(0, salesmanSearch ? undefined : 5);

  const createSalesman = api.salesman.create.useMutation({
    onMutate: async (data) => {
      const newSalesman: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
      } = {
        id: Math.random(),
        name: data.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await trpcUtils.salesman.getAll.cancel();

      trpcUtils.salesman.getAll.setData(undefined, (old) => {
        if (!old) return [newSalesman];
        return [...old, newSalesman];
      });

      return { newSalesman };
    },
    onError: (_err, _variables, ctx) => {
      toast.error("Something went wrong");
      trpcUtils.salesman.getAll.setData(
        undefined,
        ctx?.newSalesman ? [ctx.newSalesman] : []
      );
    },
    onSettled: async () => {
      await Promise.all([trpcUtils.salesman.getAll.invalidate()]);
      return toast.success("Salesman added");
    },
  });

  const handleAddSalesman = (value: string) => {
    if (!value?.trim()) return;
    createSalesman.mutate({ name: value });
  };

  return { handleAddSalesman, setSalesmanSearch, filteredSalesmen };
}
