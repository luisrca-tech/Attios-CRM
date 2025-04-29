"use client";

import { useUploadThingImage } from "~/common/hooks/useUploadThingImage";

export function useGraphWaveImages() {
  return {
    blueWaveGraphForeground: useUploadThingImage(
      "oOhzVgQXSdmB0dF1JSFeGAFHdnC69v8X024LZJtS5MelNs7o"
    ),
    whiteWaveGraphBackground: useUploadThingImage(
      "oOhzVgQXSdmBJN5xTb3A2gusiaV3hDQCR1q9fBOXGoMlPjNw"
    ),
    productsGraph: useUploadThingImage(
      "oOhzVgQXSdmB1Dt081M6aSmIjkoOG9MKY5l0petNbnLHwfAX"
    ),
  };
}
