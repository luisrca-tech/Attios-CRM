CREATE TABLE "attios_salesman" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attios_salesman_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attios_invoice" ADD COLUMN "salesman_id" integer;--> statement-breakpoint
ALTER TABLE "attios_invoice" ADD COLUMN "outside_seller" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "attios_invoice" ADD COLUMN "outside_seller_first_name" varchar(100);--> statement-breakpoint
ALTER TABLE "attios_invoice" ADD COLUMN "outside_seller_last_name" varchar(100);--> statement-breakpoint
ALTER TABLE "attios_invoice" ADD COLUMN "outside_seller_identification" varchar(100);--> statement-breakpoint
ALTER TABLE "attios_invoice" ADD COLUMN "outside_seller_email" varchar(255);--> statement-breakpoint
ALTER TABLE "attios_invoice" ADD COLUMN "outside_seller_phone" varchar(50);--> statement-breakpoint
ALTER TABLE "attios_invoice" ADD CONSTRAINT "attios_invoice_salesman_id_attios_salesman_id_fk" FOREIGN KEY ("salesman_id") REFERENCES "public"."attios_salesman"("id") ON DELETE no action ON UPDATE no action;