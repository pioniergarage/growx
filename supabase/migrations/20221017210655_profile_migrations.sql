-- Profile
-- public information

CREATE TYPE "public"."profile_type" AS ENUM (
    'PARTICIPANT',
    'MENTOR',
    'BUDDY',
    'EXPERT'
);
ALTER TYPE "public"."profile_type" OWNER TO "supabase_admin";

CREATE TABLE "public"."profile" (
    "user_id"     "uuid" NOT NULL,
    "inserted_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "forename"    "text" DEFAULT ''::"text" NOT NULL,
    "surname"     "text" DEFAULT ''::"text" NOT NULL,
    "gender"      "public"."gender" DEFAULT 'OTHER'::"public"."gender" NOT NULL,
    "type"        "public"."profile_type" NOT NULL,
    "is_student"  boolean DEFAULT false  NOT NULL, 
    "avatar"      "text",
    "bio"         "text" DEFAULT ''::"text" NOT NULL,
    "skills"      text[] DEFAULT '{}' NOT NULL,
    CONSTRAINT "profile_pk" PRIMARY KEY ("user_id"),
    CONSTRAINT "profile_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id"),
    CONSTRAINT "profile_type_unique" UNIQUE("user_id", "type")
);

ALTER TABLE "public"."profile" OWNER TO "supabase_admin";
ALTER TABLE "public"."profile" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "public"."profile" FOR SELECT USING (true);
CREATE POLICY "Allow individuals insert access" ON "public"."profile" FOR INSERT TO "authenticated" WITH CHECK (("user_id" = "auth"."uid"()));
CREATE POLICY "Allow individuals update access" ON "public"."profile" FOR UPDATE USING (("auth"."uid"() = "user_id"));


-- Contact Information
-- private, accessible in some situations

CREATE TABLE "public"."contact_information" (
    "user_id"   "uuid" NOT NULL,
    "email"     "text" DEFAULT ''::"text",
    "phone"     "text" DEFAULT ''::"text",
    CONSTRAINT "contact_information_pk" PRIMARY KEY ("user_id"),
    CONSTRAINT "contact_information_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profile"("user_id")
);

ALTER TABLE "public"."contact_information" OWNER TO "supabase_admin";
ALTER TABLE "public"."contact_information" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins read access" ON "public"."contact_information" FOR SELECT USING ("public"."isadmin"("auth"."uid"()));
CREATE POLICY "Allow individuals read access" ON "public"."contact_information" FOR SELECT USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Allow individuals insert access" ON "public"."contact_information" FOR INSERT TO "authenticated" WITH CHECK (("user_id" = "auth"."uid"()));
CREATE POLICY "Allow individuals update access" ON "public"."contact_information" FOR UPDATE USING (("auth"."uid"() = "user_id"));



-- Student
-- private information

CREATE TABLE "public"."student" (
    "user_id"    "uuid" NOT NULL, 
    "studies"    "text" DEFAULT ''::"text",
    "university" "text" DEFAULT ''::"text",
    "country"    "text" DEFAULT ''::"text", 
    "sq"         boolean DEFAULT false  NOT NULL,  
    CONSTRAINT "sutdent_pk" PRIMARY KEY ("user_id"),
    CONSTRAINT "student_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profile"("user_id")
);
ALTER TABLE "public"."student" OWNER TO "supabase_admin";
ALTER TABLE "public"."student" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins read access" ON "public"."student" FOR SELECT USING ("public"."isadmin"("auth"."uid"()));
CREATE POLICY "Allow individuals read access" ON "public"."student" FOR SELECT USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Allow individuals insert access" ON "public"."student" FOR INSERT TO "authenticated" WITH CHECK (("user_id" = "auth"."uid"()));
CREATE POLICY "Allow individuals update access" ON "public"."student" FOR UPDATE USING (("auth"."uid"() = "user_id"));



