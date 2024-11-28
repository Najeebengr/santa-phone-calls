CREATE TABLE IF NOT EXISTS "bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"scheduledDate" varchar NOT NULL,
	"scheduledTime" varchar NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
