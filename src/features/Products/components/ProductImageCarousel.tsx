'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';
import { forwardRef, useState } from 'react';
import { toast } from 'sonner';
import { isOpenContentSidebar } from '~/common/atoms/content-sidebar.atom';
import { isOpenConfirmationModal } from '~/common/atoms/is-open-confirmation-modal';
import { Button } from '~/common/components/ui/Button';
import { DeleteConfirmationModal } from '~/common/components/ui/DeleteConfirmationModal';
import { Icon } from '~/common/components/ui/Icons/_index';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '~/common/components/ui/carousel';
import { cn } from '~/lib/utils';
import type { productImages } from '~/server/db/schema';
import { UploadDropzone } from '~/utils/storage';

type BaseProductImage = typeof productImages.$inferSelect;
type ProductImage = Pick<BaseProductImage, 'key' | 'url'>;

interface ProductImageCarouselProps {
	productImages: ProductImage[];
	onImagesChange?: (images: ProductImage[]) => void;
	onFilesChange?: (files: File[]) => void;
	inputRef?: React.RefObject<HTMLInputElement>;
}

export const ProductImageCarousel = forwardRef<
	HTMLInputElement,
	ProductImageCarouselProps
>(({ productImages, onImagesChange, onFilesChange }) => {
	const [isShowingContentSidebar] = useAtom(isOpenContentSidebar);
	const [isOpenModal, setIsOpenModal] = useAtom(isOpenConfirmationModal);
	const [images, setImages] = useState<ProductImage[]>(productImages);
	const [previewImages, setPreviewImages] = useState<ProductImage[]>([]);

	const toggleConfirmationModal = () => {
		setIsOpenModal(!isOpenModal);
	};

	const handleRemoveImage = async (key: string) => {
		const newImages = images.filter((image) => image.key !== key);
		const newPreviews = previewImages.filter((image) => image.key !== key);
		setImages(newImages);
		setPreviewImages(newPreviews);
		onImagesChange?.([...newImages, ...newPreviews]);
		setIsOpenModal(false);
	};

	return (
		<div
			className={cn(
				'flex items-center justify-start rounded-xl border border-primary-200 border-dashed p-4',
				{
					'3xl:max-w-[44.8125rem] max-w-[36rem]': isShowingContentSidebar,
					'min-w-[calc(100vw-44.8125rem)] max-w-[calc(100vw-44.8125rem)]':
						!isShowingContentSidebar
				}
			)}
		>
			<Carousel
				className="w-full"
				opts={{
					align: 'start',
					containScroll: 'trimSnaps'
				}}
			>
				<CarouselContent>
					{[...images, ...previewImages].map((image, index) => (
						<CarouselItem key={image.key} className="basis-auto pr-2">
							<div className="relative">
								<Image
									className={cn(
										'rounded-lg object-cover',
										isShowingContentSidebar
											? 'h-[8.875rem] w-[8.875rem]'
											: 'h-[10.875rem] w-[10.875rem]'
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
									className="absolute top-2 right-2 h-8 w-8 rounded-lg bg-white-100 p-0 hover:bg-secondary-300"
									onClick={() => {
										if (previewImages.find((prev) => prev.key === image.key)) {
											handleRemoveImage(image.key);
										} else {
											setIsOpenModal((prev) => !prev);
										}
									}}
								>
									<Icon.Trash fill="#8181A5" className="h-4 w-4" />
								</Button>
								{isOpenModal &&
									!previewImages.find((prev) => prev.key === image.key) && (
										<DeleteConfirmationModal
											onConfirm={() => handleRemoveImage(image.key)}
											onCancel={toggleConfirmationModal}
										/>
									)}
							</div>
						</CarouselItem>
					))}
					<UploadDropzone
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							if (res) {
								const newImages = res.map((file) => ({
									url: file.url,
									key: file.key
								}));
								setPreviewImages((prev) => [...prev, ...newImages]);
								onImagesChange?.([...images, ...newImages]);
							}
						}}
						onUploadError={(error: Error) => {
							toast.error(`Error uploading: ${error.message}`);
						}}
						className={cn(
							'mt-0 ut-label:mt-2 ml-2 flex ut-button:hidden flex-col items-center justify-center rounded-lg border-2 border-primary-200 border-dashed bg-white-100 ut-upload-icon:fill-[#8181A5] ut-label:text-primary-200 ut-label:text-sm',
							isShowingContentSidebar
								? 'h-[8.875rem] w-[8.875rem]'
								: 'h-[10.875rem] w-[10.875rem]'
						)}
						content={{
							label: 'Choose your image',
							button: <Icon.Upload fill="#8181A5" className="h-4 w-4" />
						}}
					/>
				</CarouselContent>
				<CarouselPrevious className="-left-3" />
				<CarouselNext className="-right-3" />
			</Carousel>
		</div>
	);
});

ProductImageCarousel.displayName = 'ProductImageCarousel';
