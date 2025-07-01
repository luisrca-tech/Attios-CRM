CREATE TYPE "public"."attios_order_status" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TABLE "attios_brand" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_brand_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attios_category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attios_customer" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_customer_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"phone" varchar(20),
	"email" varchar(255) NOT NULL,
	"street" varchar(255),
	"city" varchar(100),
	"state" varchar(2),
	"zip_code" varchar(10),
	"avatar" varchar(255),
	"workspace_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "attios_customer_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "attios_team_user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_team_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" varchar(50) NOT NULL,
	"team_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attios_user" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"full_name" varchar(256) NOT NULL,
	"workspace_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "attios_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "attios_product_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_product_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"product_id" integer NOT NULL,
	"url" varchar(255) NOT NULL,
	"key" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attios_product" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_product_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"brand_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"category_name" varchar(20),
	"model_year" integer NOT NULL,
	"quantity" integer NOT NULL,
	"list_price" numeric(10, 2) NOT NULL,
	"sku" varchar(100),
	"currency" varchar(3),
	"subcategory" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"workspace_id" integer NOT NULL,
	"team_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "attios_product_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "attios_invoice" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_invoice_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"number" varchar(255) NOT NULL,
	"date" timestamp NOT NULL,
	"customer_id" integer,
	"status" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attios_lead_products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_lead_products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"lead_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attios_lead" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_lead_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"tag_id" integer,
	"image" varchar(255) NOT NULL,
	"converted_to_customer" boolean DEFAULT false NOT NULL,
	"converted_to_customer_at" timestamp,
	"status" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"team_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attios_order_item" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_order_item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"product_image" varchar(255),
	"quantity" integer NOT NULL,
	"list_price" numeric(10, 2) NOT NULL,
	"discount" numeric(4, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attios_order" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace" varchar(255) NOT NULL,
	"customer_id" integer NOT NULL,
	"order_status" "attios_order_status" DEFAULT 'pending' NOT NULL,
	"order_date" timestamp DEFAULT now() NOT NULL,
	"required_date" timestamp,
	"shipped_date" timestamp,
	"store_id" integer,
	"staff_id" integer,
	"user_id" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attios_workspaces" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_workspaces_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"workspace" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "attios_workspaces_workspace_unique" UNIQUE("workspace")
);
--> statement-breakpoint
CREATE TABLE "attios_team" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_team_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"workspace_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "attios_team_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "attios_tag" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_tag_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attios_customer" ADD CONSTRAINT "attios_customer_workspace_id_attios_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."attios_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_team_user" ADD CONSTRAINT "attios_team_user_user_id_attios_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."attios_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_team_user" ADD CONSTRAINT "attios_team_user_team_id_attios_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."attios_team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_user" ADD CONSTRAINT "attios_user_workspace_id_attios_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."attios_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_product_images" ADD CONSTRAINT "attios_product_images_product_id_attios_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."attios_product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_product" ADD CONSTRAINT "attios_product_brand_id_attios_brand_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."attios_brand"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_product" ADD CONSTRAINT "attios_product_category_id_attios_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."attios_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_product" ADD CONSTRAINT "attios_product_workspace_id_attios_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."attios_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_product" ADD CONSTRAINT "attios_product_team_id_attios_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."attios_team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_invoice" ADD CONSTRAINT "attios_invoice_customer_id_attios_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."attios_customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_lead_products" ADD CONSTRAINT "attios_lead_products_lead_id_attios_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."attios_lead"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_lead_products" ADD CONSTRAINT "attios_lead_products_product_id_attios_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."attios_product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_lead" ADD CONSTRAINT "attios_lead_tag_id_attios_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."attios_tag"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_lead" ADD CONSTRAINT "attios_lead_team_id_attios_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."attios_team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_order_item" ADD CONSTRAINT "attios_order_item_order_id_attios_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."attios_order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_order_item" ADD CONSTRAINT "attios_order_item_product_id_attios_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."attios_product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_order" ADD CONSTRAINT "attios_order_customer_id_attios_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."attios_customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_order" ADD CONSTRAINT "attios_order_user_id_attios_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."attios_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attios_team" ADD CONSTRAINT "attios_team_workspace_id_attios_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."attios_workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "customer_email_idx" ON "attios_customer" USING btree ("email");--> statement-breakpoint
CREATE INDEX "customer_workspace_idx" ON "attios_customer" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "attios_user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "brand_id_idx" ON "attios_product" USING btree ("brand_id");--> statement-breakpoint
CREATE INDEX "category_id_idx" ON "attios_product" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "workspace_idx" ON "attios_product" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "team_id_idx" ON "attios_product" USING btree ("team_id");--> statement-breakpoint
CREATE UNIQUE INDEX "name_workspace_idx" ON "attios_product" USING btree ("name","workspace_id");--> statement-breakpoint
CREATE INDEX "order_id_idx" ON "attios_order_item" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "product_id_idx" ON "attios_order_item" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "attios_order" USING btree ("user_id");