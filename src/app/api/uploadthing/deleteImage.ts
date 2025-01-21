'use server';

import { deleteStorageFile } from '~/app/server/storage';

export const deleteImage = async (imageKey: string) => {
	try {
		await deleteStorageFile(imageKey);
		return { success: true };
	} catch (_error) {
		return { success: false, error: 'Failed to delete image' };
	}
};
