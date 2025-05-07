import { db } from ".";
import { sql } from "drizzle-orm";

async function reset() {
  try {
    await db.execute(sql`
      DROP TABLE IF EXISTS order_item CASCADE;
      DROP TABLE IF EXISTS "order" CASCADE;
      DROP TABLE IF EXISTS product_images CASCADE;
      DROP TABLE IF EXISTS product CASCADE;
      DROP TABLE IF EXISTS brand CASCADE;
      DROP TABLE IF EXISTS category CASCADE;
      DROP TABLE IF EXISTS invoice CASCADE;
      DROP TABLE IF EXISTS lead_products CASCADE;
      DROP TABLE IF EXISTS lead CASCADE;
      DROP TABLE IF EXISTS tag CASCADE;
      DROP TABLE IF EXISTS customer CASCADE;
      DROP TABLE IF EXISTS team_user CASCADE;
      DROP TABLE IF EXISTS "user" CASCADE;

      DROP TYPE IF EXISTS order_status CASCADE;

      DROP SEQUENCE IF EXISTS order_item_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS order_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS product_images_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS brand_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS category_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS invoice_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS lead_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS tag_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS customer_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS team_user_id_seq CASCADE;
    `);

    console.log("✅ All tables and sequences dropped successfully");
  } catch (error) {
    console.error("❌ Error dropping tables and sequences:", error);
    process.exit(1);
  }
}

reset();
