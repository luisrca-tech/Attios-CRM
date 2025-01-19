import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "~/app/api/storage/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
