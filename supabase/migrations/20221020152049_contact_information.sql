CREATE TABLE "public"."contact_information" (
    "user_id" "uuid" NOT NULL,
    "email" "text" DEFAULT ''::"text" NOT NULL,
    "phone" "text",
    PRIMARY KEY ("user_id"),
    CONSTRAINT "contact_information_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id")
);


ALTER TABLE "public"."contact_information" OWNER TO "supabase_admin";

ALTER TABLE "public"."contact_information" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admins read access" ON "public"."contact_information" FOR SELECT USING ("public"."isadmin"("auth"."uid"()));
CREATE POLICY "Allow individual read access" ON "public"."contact_information" FOR SELECT USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Allow individuals insert access" ON "public"."contact_information" FOR INSERT TO "authenticated" WITH CHECK (("user_id" = "auth"."uid"()));