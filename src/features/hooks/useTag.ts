import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '~/trpc/react';

export function useTag() {
	const [tagSearch, setTagSearch] = useState('');
	const trpcUtils = api.useUtils();
	const getAllTags = api.tag.getAll.useQuery();
	const tags = getAllTags.data?.map((tag) => tag.name) ?? [];
	const filteredTags =
		tags
			.filter((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()))
			.slice(0, tagSearch ? undefined : 5) ?? [];

	const createTag = api.tag.create.useMutation({
		onMutate: async (data) => {
			const newTag = {
				id: Math.random(),
				name: data.name,
				createdAt: new Date(),
				updatedAt: new Date(),
				leads: []
			};
			await trpcUtils.tag.getAll.cancel();

			trpcUtils.tag.getAll.setData(undefined, (old) => {
				if (!old) return [newTag];
				return [...old, newTag];
			});

			return { newTag };
		},
		onError: (_err, _variables, ctx) => {
			toast.error('Something went wrong');
			trpcUtils.tag.getAll.setData(undefined, ctx?.newTag ? [ctx.newTag] : []);
		},
		onSettled: async () => {
			await Promise.all([trpcUtils.tag.getAll.invalidate()]);
			return toast.success('Tag added');
		}
	});

	const handleAddTag = (value: string) => {
		createTag.mutate({ name: value });
	};

	return { handleAddTag, setTagSearch, filteredTags };
}
