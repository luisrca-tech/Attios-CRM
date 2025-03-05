'use client';

import { useUploadThingImage } from '~/common/hooks/useUploadThingImage';

export function useGraphWaveImages() {
	return {
		blueWaveGraphForeground: useUploadThingImage(
			'oOhzVgQXSdmBvOOQ0Jwd1wzNyqRgsO84YbH3f5WDhmnocG29'
		),
		whiteWaveGraphBackground: useUploadThingImage(
			'oOhzVgQXSdmBNjcTjiCyLR6ZbaYK2E4BjS1HGFOIh8M7x3qN'
		),
		productsGraph: useUploadThingImage(
			'oOhzVgQXSdmB6ieMr35QKvRyYIgCm1OxZD3lBSojtUiA897T'
		)
	};
}
