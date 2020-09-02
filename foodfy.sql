CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "avatar_url" text,
  "created_at" timestamp
);

CREATE TABLE "receipts" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int,
  "image" text,
  "title" text,
  "ingredients" text,
  "preparation" text,
  "information" text,
  "created_at" timestamp
);
