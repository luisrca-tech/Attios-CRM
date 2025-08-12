"use client";

import { useState } from "react";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import ErrorMessage from "~/common/components/ui/ErrorMessage";
import { cn } from "~/lib/utils";
import { UploadDropzone } from "~/utils/storage";

export function BillToForm() {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <section aria-labelledby="bill-to-title">
      <div className="flex flex-col gap-6 rounded-md bg-white-100 lg:rounded-none lg:bg-transparent">
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

        <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Input.Root fieldText="Company name">
              <Input.Text
                className="px-0"
                placeholder="Start typing..."
              />
            </Input.Root>
          </div>
          <div className="flex flex-col gap-2">
            <Input.Root fieldText="Date">
              <Input.Text
                className="px-0"
                placeholder="Select due date"
              />
            </Input.Root>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Input.Root fieldText="Business address">
              <Input.Text
                className="px-0"
                placeholder="Start typing..."
              />
            </Input.Root>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Input.Root fieldText="Country">
              <Input.Text
                className="px-0"
                placeholder="Select country"
              />
            </Input.Root>
          </div>
          <div className="flex flex-col gap-2">
            <Input.Root fieldText="City">
              <Input.Text
                className="px-0"
                placeholder="Select city"
              />
            </Input.Root>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Input.Root fieldText="Phone number">
              <Input.Text
                className="px-0"
                placeholder="Start typing..."
              />
            </Input.Root>
          </div>
          <div className="flex flex-col gap-2">
            <Input.Root fieldText="Email">
              <Input.Text
                className="px-0"
                placeholder="Start typing..."
              />
            </Input.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
