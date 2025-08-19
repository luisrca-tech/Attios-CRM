"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Button } from "~/common/components/ui/Button";
import { Input } from "~/common/components/ui/Input";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { cn } from "~/lib/utils";
import { UploadDropzone } from "~/utils/storage";
import type { BillToFormValues } from "../types/billToForm.type";
import { billToSchema } from "../schemas/billToForm.schema";
import { useCountriesNew } from "../hooks/useCountriesNew";

type BillToFormProps = {
  invoiceNumber: string;
  onSaveAndNext: (data: BillToFormValues) => void;
  onCancel?: () => void;
};

export function BillToForm({ invoiceNumber, onSaveAndNext, onCancel }: BillToFormProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    filteredCountries,
    filteredCities,
    setCountrySearch,
    setCitySearch,
    selectCountry,
    selectCity,
    getPhonePrefixForCountry,
    phonePrefix,
    selectedCountryName,
    selectedCityName,
    isCitySelectEnabled,
    citiesLoading,
  } = useCountriesNew();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BillToFormValues>({
    resolver: zodResolver(billToSchema),
    defaultValues: {
      invoiceNumber,
    },
  });

  const onSubmit = (values: BillToFormValues) => {
    onSaveAndNext(values);
  };

  return (
    <section aria-labelledby="bill-to-title" className="flex flex-col h-full">
      <div className="flex flex-col gap-6 rounded-md bg-white-100 lg:rounded-none lg:bg-transparent flex-1">
        <div className="flex items-center justify-center">
          <div className="w-full">
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const urls = res?.map((f) => f.ufsUrl) ?? [];
                setPreviewUrls((prev) => [...prev, ...urls]);
                setError(null);
              }}
              onUploadError={(e: Error) => setError(e.message)}
              className={cn(
                "ut-label:mt-1 ut-button:hidden ut-upload-icon:fill-[#8181A5] ut-label:text-gray-500 ut-label:text-sm",
                "flex h-44 w-full flex-col items-center justify-center rounded-lg border-2 border-primary-200 border-dashed bg-white-100"
              )}
              content={{
                label: "Upload image",
                allowedContent: null,
                button: <Icon.Upload fill="#8181A5" />,
              }}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {!!previewUrls.length && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {previewUrls.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Upload preview"
                    className="h-24 w-full rounded-md object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 justify-between">
          <div className="flex flex-col gap-[1.875rem]">
            <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
              <div className="flex flex-col gap-2 col-span-2">
                <Input.Root fieldText="Invoice number">
                  <Input.Text
                    className="px-0"
                    placeholder="Start typing..."
                    disabled
                    {...register("invoiceNumber")}
                  />
                </Input.Root>
                {errors.invoiceNumber && (
                  <ErrorMessage>{errors.invoiceNumber.message}</ErrorMessage>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input.Root fieldText="Company name">
                  <Input.Text
                    className="px-0"
                    placeholder="Start typing..."
                    {...register("companyName")}
                  />
                </Input.Root>
              </div>
              <div className="flex flex-col gap-2">
                <Input.Root fieldText="Date">
                  <Input.Text
                    className="px-0"
                    placeholder="Select due date"
                    {...register("date")}
                  />
                </Input.Root>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
              <div className="flex flex-col gap-2 col-span-2">
                <Input.Root fieldText="Business address">
                  <Input.Text
                    className="px-0"
                    placeholder="Start typing..."
                    {...register("address")}
                  />
                </Input.Root>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Input.Root fieldText="Country">
                  <Controller
                    name="country"
                    control={control}
                    render={() => (
                      <Input.SelectInput
                        text={selectedCountryName || "Select country"}
                        options={filteredCountries}
                        onSearch={setCountrySearch}
                        onChange={(value) => {
                          selectCountry(value);
                          setValue("country", value, { shouldValidate: true });
                          setValue("city", "", { shouldValidate: true });
                          const prefix = getPhonePrefixForCountry(value);
                          setValue("phone", prefix ? `${prefix} ` : "", { shouldValidate: true });
                        }}
                      />
                    )}
                  />
                </Input.Root>
                {errors.country && (
                  <ErrorMessage>{errors.country.message}</ErrorMessage>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input.Root fieldText="City">
                  <Controller
                    name="city"
                    control={control}
                    render={() => (
                      <Input.SelectInput
                        text={citiesLoading ? "Loading cities..." : selectedCityName || "Select city"}
                        options={filteredCities}
                        onSearch={setCitySearch}
                        onChange={(value) => {
                          selectCity(value);
                          setValue("city", value, { shouldValidate: true });
                          const prefix = getPhonePrefixForCountry(selectedCountryName);
                          setValue("phone", prefix ? `${prefix} ` : "");
                        }}
                        disabled={!isCitySelectEnabled}
                      />
                    )}
                  />
                </Input.Root>
                {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Input.Root fieldText="Phone number">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input.Text
                        className="px-0"
                        placeholder={phonePrefix ? `${phonePrefix} ...` : "Start typing..."}
                        {...field}
                      />
                    )}
                  />
                </Input.Root>
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
              </div>
              <div className="flex flex-col gap-2">
                <Input.Root fieldText="Email">
                  <Input.Text
                    className="px-0"
                    placeholder="Start typing..."
                    {...register("email")}
                  />
                </Input.Root>
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
              <div className="flex flex-col gap-2 col-span-2">
                <Input.Root fieldText="Tax rate (%)">
                  <Input.Text
                    className="px-0"
                    placeholder="0.00"
                    inputMode="decimal"
                    {...register("taxRate")}
                  />
                </Input.Root>
                {errors.taxRate && (
                  <ErrorMessage>{errors.taxRate.message as string}</ErrorMessage>
                )}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <div className="hidden items-center justify-start gap-2 lg:flex">
              <Button type="submit">Save & Continue</Button>
              <Button 
                type="button" 
                className="bg-white-200 text-primary-200 hover:bg-secondary-300"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
            <div className="flex w-full items-center justify-end gap-2 lg:hidden">
              <Button type="submit" className="w-auto">Save & Continue</Button>
              <Button 
                type="button" 
                className="bg-white-200 text-primary-200 hover:bg-secondary-300"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
