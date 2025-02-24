"use client";

import { useEffect, useState } from "react";
import { getImage } from "~/app/api/uploadthing/getImage";

export function useUploadThingImage(imageKey: string) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        const result = await getImage(imageKey);
        if (result.success) {
          setImageUrl(result.url);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load image");
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, [imageKey]);

  return { imageUrl, isLoading, error };
}
