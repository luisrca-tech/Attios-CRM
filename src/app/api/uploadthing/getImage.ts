"use server";

export const getImage = async (imageKey: string) => {
  try {
    const url = `https://utfs.io/f/${imageKey}`;
    return { success: true, url };
  } catch (_error) {
    return { success: false, error: "Failed to get image" };
  }
};
