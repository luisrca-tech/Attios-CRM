"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteStorageFile(key: string) {
  return await utapi.deleteFiles(key);
}