CREATE TABLE IF NOT EXISTS "goals" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"desiredWeekFrequency" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
