import { db } from "~/server/db";

export const productActions = {
	getAllIds: () => db.query.products.findMany({
		columns: {
			id: true
		}
	})
};
