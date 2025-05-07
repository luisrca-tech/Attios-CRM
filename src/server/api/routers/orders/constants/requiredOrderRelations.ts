export const requiredOrderRelations = {
	customer: true,
	orderItems: {
		with: {
			product: {
				columns: {
					id: true,
					name: true
				}
			}
		}
	}
} as const;