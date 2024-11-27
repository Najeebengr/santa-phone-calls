CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"parentEmail" varchar NOT NULL,
	"childName" varchar,
	"parentNumber" varchar,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "users_parentEmail_unique" UNIQUE("parentEmail")
);
