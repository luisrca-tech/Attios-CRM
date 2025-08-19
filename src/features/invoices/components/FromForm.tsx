"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "~/common/components/ui/Input";
import { Checkbox } from "~/common/components/ui/checkbox";
import { Button } from "~/common/components/ui/Button";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { useSalesman } from "../hooks/useSalesman";
import { fromFormSchema } from "../schemas/fromForm.schema";
import type { FromFormValues } from "../types/fromForm.type";

type FromFormProps = {
  onSaveAndNext: (data: FromFormValues) => void;
  onBack?: () => void;
  onCancel?: () => void;
};

export function FromForm({ onSaveAndNext, onBack, onCancel }: FromFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FromFormValues>({
    resolver: zodResolver(fromFormSchema),
    defaultValues: {
      outsideSeller: false,
    },
  });

  const outsideSeller = watch("outsideSeller");

  const { filteredSalesmen, setSalesmanSearch, handleAddSalesman } =
    useSalesman();



  const onSubmit = async (values: FromFormValues) => {
    onSaveAndNext(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex h-full flex-col'>
      <div className='mt-6 flex max-h-[calc(100vh-12rem)] flex-1 flex-col justify-between gap-[0.875rem] overflow-y-auto lg:mt-[2.625rem] lg:max-h-none lg:overflow-visible'>
        <div className="flex flex-col gap-[0.875rem]">
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-[1.875rem]">
            <div className="flex w-full flex-col gap-2">
              <Input.Root
                className="w-full"
                fieldText="Salesman"
              >
                <div className="flex-1">
                  <Controller
                    name="salesman"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Input.SelectInput
                        key={outsideSeller ? "outside" : "inside"}
                        text="Salesman"
                        options={filteredSalesmen}
                        onSearch={setSalesmanSearch}
                        onChange={(value) => {
                          onChange(value);
                          setValue("outsideSeller", false, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
                        onAdd={handleAddSalesman}
                        disabled={outsideSeller}
                        withoutAddButton={outsideSeller}
                      />
                    )}
                  />
                </div>
              </Input.Root>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-md bg-white-100 px-3 py-[1.375rem] lg:rounded-none lg:bg-transparent lg:px-0">
            <div className="mb-2 flex items-center justify-between">
              <strong className="font-bold text-base">
                Outside seller Information
              </strong>
              <div className="flex w-full items-end gap-2 lg:w-auto">
                <label
                  className="flex items-center gap-2"
                  htmlFor="outsideSeller"
                >
                  <Checkbox
                    id="outsideSeller"
                    checked={outsideSeller}
                    onCheckedChange={(checked) => {
                      setValue("outsideSeller", Boolean(checked), {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      if (checked) {
                        setValue("salesman", "", {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }
                    }}
                  />
                  <span className="font-bold text-sm leading-5">
                    Outside seller
                  </span>
                </label>
              </div>
            </div>
            <div
              className={outsideSeller ? "" : "pointer-events-none opacity-50"}
            >
              <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Input.Root fieldText="Name">
                    <Input.Text
                      className="px-0"
                      placeholder="Start typing..."
                      {...register("outsideSellerFirstName")}
                    />
                  </Input.Root>
                  {errors.outsideSellerFirstName && (
                    <ErrorMessage>
                      {errors.outsideSellerFirstName.message}
                    </ErrorMessage>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Input.Root fieldText="Lastname">
                    <Input.Text
                      className="px-0"
                      placeholder="Start typing..."
                      {...register("outsideSellerLastName")}
                    />
                  </Input.Root>
                  {errors.outsideSellerLastName && (
                    <ErrorMessage>
                      {errors.outsideSellerLastName.message}
                    </ErrorMessage>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Input.Root fieldText="Identification number">
                    <Input.Text
                      className="px-0"
                      placeholder="Start typing..."
                      {...register("outsideSellerIdentification")}
                    />
                  </Input.Root>
                  {errors.outsideSellerIdentification && (
                    <ErrorMessage>
                      {errors.outsideSellerIdentification.message}
                    </ErrorMessage>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Input.Root fieldText="Email">
                    <Input.Text
                      className="px-0"
                      placeholder="Start typing..."
                      {...register("outsideSellerEmail")}
                    />
                  </Input.Root>
                  {errors.outsideSellerEmail && (
                    <ErrorMessage>
                      {errors.outsideSellerEmail.message}
                    </ErrorMessage>
                  )}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
                <div className="flex flex-col gap-2 lg:w-[16.8125rem]">
                  <Input.Root fieldText="Phone">
                    <Input.Text
                      className="px-0"
                      placeholder="Start typing..."
                      {...register("outsideSellerPhone")}
                    />
                  </Input.Root>
                  {errors.outsideSellerPhone && (
                    <ErrorMessage>
                      {errors.outsideSellerPhone.message}
                    </ErrorMessage>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="hidden items-center justify-start gap-2 lg:flex">
            <Button
              type="button"
              className="bg-white-200 text-primary-200 hover:bg-secondary-300"
              onClick={onBack}
            >
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Save & Continue"}
            </Button>
            <Button
              type="button"
              className="bg-white-200 text-primary-200 hover:bg-secondary-300"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
          <div className="flex w-full items-center justify-between gap-2 lg:hidden">
            <Button
              type="button"
              className="bg-white-200 text-primary-200 hover:bg-secondary-300"
              onClick={onBack}
            >
              Back
            </Button>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting} className="w-auto">
                {isSubmitting ? "Creating..." : "Save & Continue"}
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
      </div>
    </form>
  );
}
