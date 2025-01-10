"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { forwardRef, useState } from "react";
import { toast } from "sonner";
import { imageDelete } from "~/app/api/uploadthing/deleteImage";
import { isOpenContentSidebar } from "~/common/atoms/content-sidebar.atom";
import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/common/components/ui/carousel";
import { cn } from "~/lib/utils";
import { UploadDropzone } from "~/utils/uploadthing";

type ProductImageCarouselProps = {
  productImages: { url: string }[]; 
  onImagesChange?: (images: { url: string }[]) => void;
  onFilesChange?: (files: File[]) => void;
};

export const ProductImageCarousel = forwardRef<HTMLInputElement, ProductImageCarouselProps>(
  ({ productImages = [], onImagesChange, onFilesChange }, inputRef) => {
    const [images, setImages] = useState(productImages);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [isShowingContentSidebar] = useAtom(isOpenContentSidebar);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      const newFiles = Array.from(files);
      onFilesChange?.(newFiles);

      const newPreviewImages = newFiles.map(file => ({
        url: URL.createObjectURL(file),
      }));

      setImages(prev => {
        const updated = [...prev, ...newPreviewImages];
        onImagesChange?.(updated);
        return updated;
      });
    };

    const handleRemoveImage = async (index: number) => {
      const image = productImages[index];
      if (!image) return;
    };

    return (
      <div className={cn(
        "flex rounded-xl items-center justify-start gap-2 p-4 border border-primary-200 border-dashed", {
          "max-w-[36rem] 3xl:max-w-[44.8125rem]": isShowingContentSidebar,
          "max-w-[calc(100vw-44.8125rem)] min-w-[calc(100vw-44.8125rem)]": !isShowingContentSidebar
        }
      )}>
        <div className="relative w-full flex items-center">
          {images.length > 0 ? (
            <div className="relative w-full">
              <Carousel 
                className="w-full"
                opts={{
                  align: "start",
                  containScroll: "trimSnaps",
                }}
                setApi={(api) => {
                  if (!api) return;
                  setCanScrollPrev(api.canScrollPrev());
                  setCanScrollNext(api.canScrollNext());
                }}
              >
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="basis-auto mr-4">
                      <div className="relative">
                        <Image 
                          className={cn(
                            "rounded-lg object-cover",
                            isShowingContentSidebar 
                              ? "max-w-[8.875rem] max-h-[8.875rem] min-w-[8.875rem] min-h-[8.875rem]" 
                              : "max-w-[10.875rem] max-h-[10.875rem] min-w-[10.875rem] min-h-[10.875rem]"
                          )}
                          src={image.url} 
                          alt={`Product image ${index + 1}`} 
                          width={isShowingContentSidebar ? 142 : 174} 
                          height={isShowingContentSidebar ? 142 : 174} 
                        />
                        <Button
                          type="button"
                          variant="filled"
                          color="secondary"
                          className="absolute p-0 bg-white-100 top-2 right-2 h-8 w-8 rounded-lg hover:bg-secondary-300"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Icon.Trash fill="#8181A5" className="h-4 w-4" />
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                  <CarouselItem className="basis-auto pl-0">
                    <div className="relative">
                      <UploadDropzone
                        endpoint="imageUploader"
                        onUploadError={(error: Error) => {
                          toast.error(`Error uploading: ${error.message}`);
                        }}
                        className={cn(
                          "ut-label:text-sm ut-label:text-gray-500 ut-label:mt-2 ut-upload-icon:fill-[#8181A5] ut-button:hidden mt-0",
                          isShowingContentSidebar 
                            ? "w-[142px] h-[142px]"
                            : "w-[174px] h-[174px]",
                          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-200 bg-white-100"
                        )}
                        content={{
                          label: "Add Image",
                          allowedContent: null,
                          button: <Icon.Upload fill="#8181A5" />,
                        }}
                      />
                      <input
                        ref={inputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                {canScrollPrev && <CarouselPrevious />}
                {canScrollNext && <CarouselNext />}
              </Carousel>
            </div>
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              onUploadError={(error: Error) => {
                toast.error(`Error uploading: ${error.message}`);
              }}
              className="ut-label:text-sm ut-label:text-gray-500 ut-upload-icon:fill-[#8181A5] ut-button:hidden w-full flex flex-col items-center justify-center gap-2"
              content={{
                label: "Drop your images here or browse",
                allowedContent: null,
                button: <Icon.Upload fill="#8181A5" />,
              }}
            />
          )}
        </div>
      </div>
    );
  }
);

ProductImageCarousel.displayName = "ProductImageCarousel";