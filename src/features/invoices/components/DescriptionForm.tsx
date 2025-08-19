"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/common/components/ui/Button";
import { CommingSoon } from "~/common/components/ui/CommingSoon";

const descriptionSchema = z.object({
  description: z.string().optional(),
});

type DescriptionFormValues = z.infer<typeof descriptionSchema>;

type DescriptionFormProps = {
  onSaveAndNext: (data: DescriptionFormValues) => void;
  onBack?: () => void;
  onCancel?: () => void;
};

export function DescriptionForm({ onSaveAndNext, onBack, onCancel }: DescriptionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DescriptionFormValues>({
    resolver: zodResolver(descriptionSchema),
  });

  const onSubmit = (values: DescriptionFormValues) => {
    onSaveAndNext(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex h-full flex-col'>
      <div className='mt-6 flex max-h-[calc(100vh-12rem)] flex-1 flex-col justify-between gap-[0.875rem] overflow-y-auto lg:mt-[2.625rem] lg:max-h-none lg:overflow-visible'>
        <div className="flex flex-col gap-[0.875rem]">
          <CommingSoon message="Description form coming soon!" />
        </div>

        <div className="mt-auto pt-6">
          <div className="hidden items-center justify-start gap-2 lg:flex">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Save & Send"}
            </Button>
            <Button
              type="button"
              className="bg-white-200 text-primary-200 hover:bg-secondary-300"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
          <div className="flex w-full items-center justify-end gap-2 lg:hidden">
            <Button type="submit" disabled={isSubmitting} className="w-auto">
              {isSubmitting ? "Creating..." : "Save & Send"}
            </Button>
            <Button
              type="button"
              className="bg-white-200 text-primary-200 hover:bg-secondary-300"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
