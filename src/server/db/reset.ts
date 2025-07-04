import { db } from ".";
import { sql } from "drizzle-orm";

async function reset() {
  try {
    await db.execute(sql`
      DROP INDEX IF EXISTS user_id_idx CASCADE;
      DROP INDEX IF EXISTS product_id_idx CASCADE;
      DROP INDEX IF EXISTS order_id_idx CASCADE;
      DROP INDEX IF EXISTS category_id_idx CASCADE;
      DROP INDEX IF EXISTS brand_id_idx CASCADE;
      DROP INDEX IF EXISTS email_idx CASCADE;
      DROP INDEX IF EXISTS customer_email_idx CASCADE;
      DROP INDEX IF EXISTS category_id_idx CASCADE;
      DROP TABLE IF EXISTS attios_order_item CASCADE;
      DROP TABLE IF EXISTS attios_order CASCADE;
      DROP TABLE IF EXISTS attios_product_images CASCADE;
      DROP TABLE IF EXISTS attios_product CASCADE;
      DROP TABLE IF EXISTS attios_brand CASCADE;
      DROP TABLE IF EXISTS attios_category CASCADE;
      DROP TABLE IF EXISTS attios_invoice CASCADE;
      DROP TABLE IF EXISTS attios_lead_products CASCADE;
      DROP TABLE IF EXISTS attios_lead CASCADE;
      DROP TABLE IF EXISTS attios_tag CASCADE;
      DROP TABLE IF EXISTS attios_customer CASCADE;
      DROP TABLE IF EXISTS attios_team_user CASCADE;
      DROP TABLE IF EXISTS attios_team CASCADE;
      DROP TABLE IF EXISTS attios_user CASCADE;
      DROP TABLE IF EXISTS attios_workspace CASCADE;
      DROP TABLE IF EXISTS attios_sub_domain CASCADE;

      DROP TYPE IF EXISTS order_status CASCADE;
      DROP TYPE IF EXISTS attios_order_status CASCADE;

      DROP SEQUENCE IF EXISTS attios_order_item_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_order_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_product_images_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_brand_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_category_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_invoice_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_lead_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_tag_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_customer_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_team_user_id_seq CASCADE;
      DROP SEQUENCE IF EXISTS attios_workspace_id_seq CASCADE;
    `);

    console.log("✅ All tables and sequences dropped successfully");
  } catch (error) {
    console.error("❌ Error dropping tables and sequences:", error);
    process.exit(1);
  }
}

reset();
