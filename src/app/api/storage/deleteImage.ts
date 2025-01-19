"use server";

import { deleteStorageFile } from "~/app/server/storage";

export const deleteImage = async (imageKey: string) => {
  try {
    const response = await deleteStorageFile(imageKey);
    return { success: response.success };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false };
  }
};