"use server";

import { deleteUploadThingFile } from "~/app/server/uploadthing";

export const imageDelete = async (imageKey: string) => {
  try {
    const response = await deleteUploadThingFile(imageKey);
    return { success: response.success };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false };
  }
};