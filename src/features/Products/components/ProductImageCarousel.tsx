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
>(({ productImages, onImagesChange }) => {
	const [isShowingContentSidebar] = useAtom(isOpenContentSidebar);
	const [isOpenModal, setIsOpenModal] = useAtom(isOpenConfirmationModal);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const [images, setImages] = useState<ProductImage[]>(productImages);
	console.log('Product images:', productImages);
	console.log('Images:', images);

	const toggleConfirmationModal = () => {
		setIsOpenModal(!isOpenModal);
	};

	const handleRemoveImage = async (key: string) => {
		const newImages = images.filter((image) => image.key !== key);
		setImages(newImages);
		onImagesChange?.(newImages);
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
				setApi={(api) => {
					if (!api) return;
					setCanScrollPrev(api.canScrollPrev());
					setCanScrollNext(api.canScrollNext());
				}}
			>
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={image.key} className="basis-auto pr-2">
							<div className="relative">
								<Image
									className={cn(
										'rounded-lg object-cover',
										isShowingContentSidebar
											? 'max-h-[8.875rem] min-h-[8.875rem] min-w-[8.875rem] max-w-[8.875rem]'
											: 'max-h-[10.875rem] min-h-[10.875rem] min-w-[10.875rem] max-w-[10.875rem]'
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
									className='absolute top-2 right-2 h-8 w-8 rounded-lg bg-white-100 p-0 hover:bg-secondary-300'
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
					<UploadDropzone
						endpoint="imageUploader"
						onUploadError={(error: Error) => {
							toast.error(`Error uploading: ${error.message}`);
						}}
						className={cn(
							'ut-label:mt-2 ut-button:hidden ut-upload-icon:fill-[#8181A5] ut-label:text-gray-500 ut-label:text-sm',
							isShowingContentSidebar
								? 'h-[8.875rem] w-[8.875rem]'
								: 'h-[10.875rem] w-[10.875rem]',
							'flex flex-col items-center justify-center rounded-lg border-2 border-primary-200 border-dashed bg-white-100'
						)}
						content={{
							allowedContent: null,
							button: <Icon.Upload fill="#8181A5" className="h-4 w-4" />
						}}
					/>
				</CarouselContent>
				{canScrollPrev && <CarouselPrevious />}
				{canScrollNext && <CarouselNext />}
			</Carousel>
		</div>
	);
});

ProductImageCarousel.displayName = 'ProductImageCarousel';
