import { db } from "../index";
import { roles } from "../schema/roles";

export async function seedRoles() {
  await db.delete(roles);

  const rolesData = [
    { name: "Customer" },
    { name: "Prospect" },
    { name: "Partner" },
    { name: "Supplier" },
  ];

  const insertedRoles = (await db
    .insert(roles)
    .values(rolesData)
    .returning()) as { id: number; name: string }[];

  console.log(`✅ Seeded ${insertedRoles.length} roles`);

  return { insertedRoles };
}
