"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { forwardRef, useState } from "react";
import { toast } from "sonner";
import { imageDelete } from "~/app/api/uploadthing/deleteImage";
import { isOpenContentSidebar } from "~/common/atoms/content-sidebar.atom";
import { isOpenConfirmationModal } from "~/common/atoms/is-open-confirmation-modal";
import { Button } from "~/common/components/ui/Button";
import { DeleteConfirmationModal } from "~/common/components/ui/DeleteConfirmationModal";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/common/components/ui/carousel";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { UploadDropzone } from "~/utils/uploadthing";

interface ProductImage {
  url: string | { url: string };
  key: string;
}

interface ProductImageCarouselProps {
  productImages?: ProductImage[];
  onImagesChange?: (images: ProductImage[]) => void;
  onFilesChange?: (files: File[]) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const ProductImageCarousel = forwardRef<HTMLInputElement, ProductImageCarouselProps>(
  ({ productImages = [], onImagesChange, onFilesChange, inputRef }) => {
    const [isShowingContentSidebar] = useAtom(isOpenContentSidebar);
    const [isOpenModal, setIsOpenModal] = useAtom(isOpenConfirmationModal);
    const [images, setImages] = useState<ProductImage[]>(productImages);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const deleteImageMutation = api.images.deleteImage.useMutation();

    const toggleConfirmationModal = () => {
      setIsOpenModal(!isOpenModal);
    }


    const handleRemoveImage = async (key: string) => {
      try {
        await deleteImageMutation.mutateAsync({ 
          productId: window.location.pathname.split('/').pop() ?? '',
          imageKey: key
        });
        await imageDelete(key);
        const newImages = images.filter(img => img.key !== key);
        setImages(newImages);
        onImagesChange?.(newImages);
        setIsOpenModal(false);
      } catch (error) {
        toast.error("Failed to delete image");
      }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      const newFiles = Array.from(files);
      onFilesChange?.(newFiles);

      const newPreviewImages = newFiles.map(file => {
        const blobUrl = URL.createObjectURL(file);
        const key = blobUrl.split('/').pop() ?? blobUrl;
        return {
          id: key,
          key: key,
          url: blobUrl,
        };
      });

      setImages(prev => {
        const updated = [...prev, ...newPreviewImages];
        onImagesChange?.(updated);
        return updated;
      });
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
                          src={typeof image.url === 'string' ? image.url : image.url.url} 
                          alt={`Product image ${index + 1}`} 
                          width={isShowingContentSidebar ? 142 : 174} 
                          height={isShowingContentSidebar ? 142 : 174} 
                        />
                        <Button
                          type="button"
                          variant="filled"
                          color="secondary"
                          className="absolute p-0 bg-white-100 top-2 right-2 h-8 w-8 rounded-lg hover:bg-secondary-300"
                          onClick={() => {
                            setIsOpenModal((prev) => !prev);
                          }}
                        >
                          <Icon.Trash fill="#8181A5" className="h-4 w-4" />
                        </Button>
                        {isOpenModal && (
                          <DeleteConfirmationModal 
                            onConfirm={() => handleRemoveImage(image.key)}
                            onCancel={toggleConfirmationModal}
                          />
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                  <CarouselItem className="basis-auto pl-0 -mt-2">
                    <div className="relative">
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={
                          (res) => {
                            console.log('Upload response:', res);
                            const newImages = res.map(file => ({ 
                              id: file.key,
                              url: file.url, 
                              key: file.key
                            }));
                            console.log('New images:', newImages);
                            setImages(prev => {
                              const existingImages = prev.filter(img => !img.key.startsWith('blob:'));
                              const updated = [...existingImages, ...newImages];
                              onImagesChange?.(updated);
                              return updated;
                            });
                          }
                        }
                        onUploadError={(error: Error) => {
                          toast.error(`Error uploading: ${error.message}`);
                        }}
                        className={cn(
                          "ut-label:text-sm ut-label:text-gray-500 ut-label:mt-2 ut-upload-icon:fill-[#8181A5] ut-button:hidden",
                          isShowingContentSidebar 
                            ? "w-[8.875rem] h-[8.875rem]"
                            : "w-[10.875rem] h-[10.875rem]",
                          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-200 bg-white-100 mt-0"
                        )}
                        content={{
                          label: "Add more images",
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
              onClientUploadComplete={
                (res) => {
                  console.log('Upload response:', res);
                  const newImages = res.map(file => ({ 
                    id: file.key,
                    url: file.url, 
                    key: file.key
                  }));
                  console.log('New images:', newImages);
                  setImages(prev => {
                    const existingImages = prev.filter(img => !img.key.startsWith('blob:'));
                    const updated = [...existingImages, ...newImages];
                    onImagesChange?.(updated);
                    return updated;
                  });
                }
              }
              onUploadError={(error: Error) => {
                toast.error(`Error uploading: ${error.message}`);
              }}
              className={cn(
                "ut-label:text-sm ut-label:text-gray-500 ut-label:mt-2 ut-upload-icon:fill-[#8181A5] ut-button:hidden",
                isShowingContentSidebar 
                  ? "w-[8.875rem] h-[8.875rem]"
                  : "w-[10.875rem] h-[10.875rem]",
                "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-200 bg-white-100 mt-0"
              )}
              content={{
                label: "Add more images",
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