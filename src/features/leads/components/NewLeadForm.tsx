import { useForm } from 'react-hook-form';
import type { NewLead } from '../types/newLead.type';
import { newLeadSchema } from '../schemas/newLead.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/common/components/ui/Input';
import Image from 'next/image';
import { Icon } from '~/common/components/ui/Icons/_index';
import { UploadButton } from '~/utils/storage';
import { toast } from 'sonner';
import ErrorMessage from '~/common/components/ui/ErrorMessage';
import { useIsDesktop } from '~/common/hooks/useMediaQuery';
import { useCategory } from '~/features/hooks/useCategory';
import { Button } from '~/common/components/ui/Button';
import { useRouter } from 'next/navigation';

export function NewLeadForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setValue
	} = useForm<NewLead>({
		resolver: zodResolver(newLeadSchema)
	});
	const file = watch('file');
	const router = useRouter();
	const isDesktop = useIsDesktop();

	const handleFileSelect = (file: File) => {
		setValue('file', file);
	};

	const {
		filteredCategories,
		setCategorySearch: onSearchCategory,
		handleAddCategory
	} = useCategory();

	const onSubmit = (data: NewLead) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mt-10 mb-24 flex flex-col justify-between gap-10 lg:mb-0">
				<div>
					{file ? (
						<div className="relative flex items-center justify-center">
							<div className="h-36 w-36">
								<Image
									data-testid="product-image-preview"
									src={URL.createObjectURL(file)}
									width={144}
									height={144}
									alt="Product preview"
									className="h-full w-full rounded-xl object-cover"
								/>
							</div>
							<button
								type="button"
								onClick={() => setValue('file', undefined)}
								className="absolute top-0 right-10 rounded-full bg-white-100 p-1 shadow-md hover:bg-gray-50 lg:top-0 lg:right-0"
							>
								<Icon.CloseButton className="h-4 w-4" />
							</button>
						</div>
					) : (
						<UploadButton
							data-testid="product-image-upload-button"
							endpoint="imageUploader"
							onBeforeUploadBegin={() => {
								return [];
							}}
							onChange={(files) => {
								if (files?.[0]) {
									handleFileSelect(files[0]);
								}
							}}
							onUploadError={(error: Error) => {
								toast.error(
									`Something went wrong on uploading image: ${error.message} please, try again!`
								);
							}}
							appearance={{
								button:
									'p-9 h-[5.25rem] w-[5.25rem] lg:h-[6.5rem] lg:w-[6.5rem] flex items-center justify-center rounded-xl bg-white-100 lg:bg-primary-100/10'
							}}
							content={{
								button: (
									<Icon.AddLead
										className="h-8 w-8 text-primary-200 lg:text-primary-100"
										fill={isDesktop ? '#1B51E5' : '#8181A5'}
									/>
								)
							}}
						/>
					)}
					{errors.file && (
						<ErrorMessage>{errors.file.message?.toString()}</ErrorMessage>
					)}
				</div>
				<div className="flex flex-col gap-4 rounded-md bg-white-100 px-3 py-[1.375rem] lg:rounded-none lg:bg-transparent lg:px-0">
					<div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
						<div className="flex flex-col gap-2">
							<Input.Root fieldText="First name">
								<Input.Text
									className="px-0"
									renderIconRight={() => (
										<Icon.Identity className="h-[1.125rem] min-w-[1.125rem]" />
									)}
									placeholder="Start typing..."
									{...register('firstName')}
								/>
							</Input.Root>
							{errors.firstName && (
								<ErrorMessage>{errors.firstName.message}</ErrorMessage>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Input.Root fieldText="Last name">
								<Input.Text
									renderIconRight={() => (
										<Icon.Flyer className="h-[1.125rem] min-w-[1.125rem]" />
									)}
									placeholder="Start typing..."
									className="px-0"
									{...register('lastName')}
								/>
							</Input.Root>
							{errors.lastName && (
								<ErrorMessage>{errors.lastName.message}</ErrorMessage>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Input.Root fieldText="Email">
							<Input.Text
								placeholder="Start typing..."
								className="px-0"
								renderIconRight={() => (
									<Icon.Email
										className="h-[1.125rem] min-w-[1.125rem]"
										fill="#8181A5"
									/>
								)}
								{...register('email')}
							/>
						</Input.Root>
						{errors.email && (
							<ErrorMessage>{errors.email.message}</ErrorMessage>
						)}
					</div>
					<div className="grid grid-cols-1 gap-[1.875rem] lg:grid-cols-2">
						<div className="flex flex-col gap-2">
							<Input.Root fieldText="Phone">
								<Input.Text
									placeholder="Start typing..."
									className="px-0"
									renderIconRight={() => (
										<Icon.Telephone
											className="h-[1.125rem] min-w-[1.125rem]"
											fill="#8181A5"
										/>
									)}
									{...register('phone')}
								/>
							</Input.Root>
							{errors.phone && (
								<ErrorMessage>{errors.phone.message}</ErrorMessage>
							)}
						</div>
						<div className="flex w-full flex-col gap-2">
							<Input.Root className="w-full" fieldText="Category">
								<div className="flex-1">
									<Input.SelectInput
										text="Select category"
										options={filteredCategories}
										onSearch={onSearchCategory}
										{...register('category')}
										onChange={(value) => setValue('category', value)}
										onAdd={handleAddCategory}
									/>
								</div>
							</Input.Root>
							{errors.category && (
								<ErrorMessage>{errors.category.message}</ErrorMessage>
							)}
						</div>
					</div>
				</div>
				{/* Buttons showing on desktop */}
				<div className="mt-6 hidden justify-between lg:mt-[1.6875rem] lg:flex">
					<Button
						type="button"
						onClick={() => router.back()}
						className="bg-white-200 text-primary-200 hover:bg-secondary-300"
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Creating...' : 'Add Lead'}
					</Button>
				</div>
				<div className="w-fulll lg:hidden">
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? 'Creating...' : 'Add Lead'}
					</Button>
				</div>
			</div>
		</form>
	);
}
