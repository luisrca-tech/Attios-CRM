'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { forwardRef, useEffect } from 'react';
import { toast } from 'sonner';
import { deleteImage } from '~/app/api/uploadthing/deleteImage';
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
import { api } from '~/trpc/react';
import { UploadDropzone } from '~/utils/storage';

type BaseProductImage = typeof productImages.$inferSelect;
type ProductImage = Pick<BaseProductImage, 'key' | 'url'>;

interface ProductImageCarouselProps {
	images: ProductImage[];
	productId: string;
	onImagesChange?: (images: ProductImage[]) => void;
	onFilesChange?: (files: File[]) => void;
	inputRef?: React.RefObject<HTMLInputElement>;
}

export const ProductImageCarousel = forwardRef<
	HTMLInputElement,
	ProductImageCarouselProps
>(({ images, productId, onImagesChange, onFilesChange }) => {
	const [isShowingContentSidebar] = useAtom(isOpenContentSidebar);
	const [isOpenModal, setIsOpenModal] = useAtom(isOpenConfirmationModal);
	const imageDeletion = api.images.delete.useMutation();
	const router = useRouter();

	const toggleConfirmationModal = () => {
		setIsOpenModal(!isOpenModal);
	};

	const handleRemoveImage = async (key: string) => {
		try {
			await imageDeletion.mutateAsync({
				productId: productId,
				imageKey: key
			});
			await deleteImage(key);
			const newImages = images.filter((image) => image.key !== key);
			onImagesChange?.(newImages);
			setIsOpenModal(false);
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Error on deleting image'
			);
		}
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files?.length) return;

		const newFiles = Array.from(files);
		onFilesChange?.(newFiles);

		const newPreviewImages = newFiles.map((file) => ({
			url: URL.createObjectURL(file),
			key: file.name
		}));

		onImagesChange?.([...images, ...newPreviewImages]);
	};

	useEffect(() => {
		onImagesChange?.(images);
		router.refresh();
	}, [images, router, onImagesChange]);

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
					{images.map((image, index) => (
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
									onClick={toggleConfirmationModal}
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
					<CarouselItem className="basis-auto pl-2">
						<div className="-mt-2 relative">
							<UploadDropzone
								endpoint="imageUploader"
								onClientUploadComplete={(res) => {
									if (res) {
										const newImages = res.map((file) => ({
											url: file.url,
											key: file.key
										}));
										onImagesChange?.([...images, ...newImages]);
									}
								}}
								onUploadError={(error: Error) => {
									toast.error(`Error uploading: ${error.message}`);
								}}
								className={cn(
									'ut-label:mt-2 ut-button:hidden ut-upload-icon:fill-[#8181A5] ut-label:text-gray-500 ut-label:text-sm',
									isShowingContentSidebar
										? 'h-[142px] w-[142px]'
										: 'h-[174px] w-[174px]',
									'flex flex-col items-center justify-center rounded-lg border-2 border-primary-200 border-dashed bg-white-100'
								)}
								content={{
									label: 'Add Image',
									allowedContent: null,
									button: <Icon.Upload fill="#8181A5" />
								}}
							/>
							<input
								type="file"
								multiple
								accept="image/*"
								onChange={handleFileChange}
								className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
							/>
						</div>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious className="-left-3" />
				<CarouselNext className="-right-3" />
			</Carousel>
		</div>
	);
});

ProductImageCarousel.displayName = 'ProductImageCarousel';
