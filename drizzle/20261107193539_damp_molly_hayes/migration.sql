CREATE TABLE "documents" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "documents_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"embedding" vector(3) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
