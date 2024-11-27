CREATE TABLE IF NOT EXISTS "children" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "children_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"childName" varchar NOT NULL,
	"age" integer NOT NULL,
	"gender" varchar,
	"connections" varchar,
	"details" varchar,
	"hobbies" varchar
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "parentNumber" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "callType" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "scheduledDate" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "scheduledTime" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "recipientName" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "recipientPhone" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "children" ADD CONSTRAINT "children_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "childName";