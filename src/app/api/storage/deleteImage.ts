"use server";

import { toast } from "sonner";
import { deleteStorageFile } from "~/app/server/storage";

export const deleteImage = async (imageKey: string) => {
  try {
    await deleteStorageFile(imageKey);
    return toast.success('Image deleted successfully');
  } catch (error) {
    return toast.error('Error deleting image');
  }
};