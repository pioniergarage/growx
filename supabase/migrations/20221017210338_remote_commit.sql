--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: moddatetime; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "extensions";


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";


--
-- Name: enum_event_type; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE "public"."enum_event_type" AS ENUM (
    'Online',
    'Offline',
    'Hybrid'
);


ALTER TYPE "public"."enum_event_type" OWNER TO "supabase_admin";

--
-- Name: event_type; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE "public"."event_type" AS ENUM (
    'Online',
    'Offline',
    'Hybrid'
);


ALTER TYPE "public"."event_type" OWNER TO "supabase_admin";

--
-- Name: gender; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE "public"."gender" AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);


ALTER TYPE "public"."gender" OWNER TO "supabase_admin";

--
-- Name: sponsor_type; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE "public"."sponsor_type" AS ENUM (
    'GOLD',
    'SILVER',
    'BRONZE',
    'FLAGSHIP'
);


ALTER TYPE "public"."sponsor_type" OWNER TO "supabase_admin";

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE "public"."user_role" AS ENUM (
    'PARTICIPANT',
    'BUDDY',
    'MENTOR',
    'EXPERT',
    'ORGA'
);


ALTER TYPE "public"."user_role" OWNER TO "supabase_admin";

--
-- Name: accept_request("uuid"); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION "public"."accept_request"("requesting_user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
  declare
    tid int8;
  begin
    -- get team of accepting user
    select team_id into tid from team_members where user_id = auth.uid();
    if not found then
      raise exception 'not a team member';
    end if;

    -- check if request exists
    if requesting_user_id not in (select user_id from public.team_requests where team_id = tid) then
      raise exception 'user does not request to be in team';
    end if;

    -- remove request entry
    delete from public.team_requests where user_id = requesting_user_id and team_id = tid;

    -- add member entry
    insert into public.team_members (user_id, team_id)
      values
          (requesting_user_id, tid);
      end;
$$;


ALTER FUNCTION "public"."accept_request"("requesting_user_id" "uuid") OWNER TO "supabase_admin";

--
-- Name: add_first_member(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION "public"."add_first_member"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
  begin
    -- add member 
    insert into public.team_members (user_id, team_id)
      values (auth.uid(), new.id);
    
    -- remove pending request to join another team
    delete from public.team_requests where user_id = auth.uid();

    return new;
  end;
$$;


ALTER FUNCTION "public"."add_first_member"() OWNER TO "supabase_admin";

--
-- Name: archive_if_empty(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION "public"."archive_if_empty"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
  declare
    member_count int;
  begin
    select count(user_id) into member_count from public.team_members where team_id = old.team_id;
    if member_count = 0 then
      update teams set archived = true where id = old.team_id;
    end if;
    return old;
  end;
$$;


ALTER FUNCTION "public"."archive_if_empty"() OWNER TO "supabase_admin";

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "supabase_admin";

--
-- Name: isadmin("uuid"); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION "public"."isadmin"("user_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
  declare 
    exist_number int;
  begin  
    select 1
    into exist_number 
    from profiles
    where isAdmin.user_id = profiles.user_id 
    and profiles.role = 'ORGA'::public.user_role;
    
    return exist_number > 0;
  end;
$$;


ALTER FUNCTION "public"."isadmin"("user_id" "uuid") OWNER TO "supabase_admin";

--
-- Name: restrict_role_update(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION "public"."restrict_role_update"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
  declare
    caller_role public.user_role;
  begin
    select role into caller_role from profiles where user_id = auth.uid();
    if caller_role = 'ORGA'::public.user_role then
      return new;
    end if;

    if new.role = 'MENTOR'::public.user_role then
      return new;
    end if;
    
    new.role = old.role;
    return new;
  end;
$$;


ALTER FUNCTION "public"."restrict_role_update"() OWNER TO "supabase_admin";

SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: event_backup19_08_2022; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."event_backup19_08_2022" (
    "id" bigint,
    "inserted_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "title" "text",
    "date" timestamp without time zone,
    "description" "text",
    "online" boolean,
    "mandatory" boolean,
    "type_id" bigint,
    "location" "text",
    "sq_mandatory" boolean
);


ALTER TABLE "public"."event_backup19_08_2022" OWNER TO "supabase_admin";

--
-- Name: event_registrations; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."event_registrations" (
    "inserted_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "user_id" "uuid" NOT NULL,
    "event_id" bigint NOT NULL,
    "present" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."event_registrations" OWNER TO "supabase_admin";

--
-- Name: events; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."events" (
    "id" bigint NOT NULL,
    "inserted_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "title" "text" DEFAULT ''::"text" NOT NULL,
    "date" timestamp without time zone DEFAULT "now"() NOT NULL,
    "description" "text" DEFAULT ''::"text" NOT NULL,
    "mandatory" boolean DEFAULT false NOT NULL,
    "location" "text" NOT NULL,
    "sq_mandatory" boolean DEFAULT false NOT NULL,
    "type" "public"."enum_event_type"
);


ALTER TABLE "public"."events" OWNER TO "supabase_admin";

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."events" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."faqs" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "question" "text" DEFAULT ''::"text",
    "answer" "text" DEFAULT ''::"text"
);


ALTER TABLE "public"."faqs" OWNER TO "supabase_admin";

--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."faqs" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."faqs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: mentor_assignment; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."mentor_assignment" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "mentor" "uuid" NOT NULL,
    "team" bigint NOT NULL
);


ALTER TABLE "public"."mentor_assignment" OWNER TO "supabase_admin";

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."profiles" (
    "user_id" "uuid" NOT NULL,
    "inserted_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "first_name" "text" DEFAULT ''::"text" NOT NULL,
    "last_name" "text" DEFAULT ''::"text" NOT NULL,
    "email" "text" DEFAULT ''::"text" NOT NULL,
    "gender" "public"."gender" DEFAULT 'OTHER'::"public"."gender",
    "phone" "text",
    "studies" "text",
    "university" "text",
    "homeland" "text",
    "avatar" "text",
    "role" "public"."user_role" DEFAULT 'PARTICIPANT'::"public"."user_role" NOT NULL,
    "skills" "json" DEFAULT '[]'::"json" NOT NULL,
    "bio" "text",
    "keyQualification" boolean DEFAULT false NOT NULL,
    "universityCountry" "text" DEFAULT ''::"text"
);


ALTER TABLE "public"."profiles" OWNER TO "supabase_admin";

--
-- Name: signup_info; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."signup_info" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "lookingForTeam" boolean DEFAULT false NOT NULL,
    "idea" "text" DEFAULT ''::"text" NOT NULL,
    "expectations" "text" DEFAULT ''::"text" NOT NULL,
    "source" "text" DEFAULT ''::"text" NOT NULL,
    "email" "text" DEFAULT ''::"text" NOT NULL
);


ALTER TABLE "public"."signup_info" OWNER TO "supabase_admin";

--
-- Name: sponsors; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."sponsors" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "logo" "text" DEFAULT ''::"text" NOT NULL,
    "link" "text" DEFAULT ''::"text" NOT NULL,
    "type" "public"."sponsor_type" NOT NULL
);


ALTER TABLE "public"."sponsors" OWNER TO "supabase_admin";

--
-- Name: sponsors_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."sponsors" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."sponsors_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: team_members; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."team_members" (
    "inserted_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "user_id" "uuid" NOT NULL,
    "team_id" bigint NOT NULL
);


ALTER TABLE "public"."team_members" OWNER TO "supabase_admin";

--
-- Name: team_requests; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."team_requests" (
    "inserted_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "user_id" "uuid" NOT NULL,
    "team_id" bigint NOT NULL
);


ALTER TABLE "public"."team_requests" OWNER TO "supabase_admin";

--
-- Name: teams; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE "public"."teams" (
    "inserted_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "id" bigint NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text" DEFAULT ''::"text" NOT NULL,
    "tags" "json" DEFAULT '[]'::"json" NOT NULL,
    "logo" "text" DEFAULT ''::"text",
    "archived" boolean DEFAULT false NOT NULL,
    "requestSupport" "json" DEFAULT '[]'::"json" NOT NULL
);


ALTER TABLE "public"."teams" OWNER TO "supabase_admin";

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."teams" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."teams_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");


--
-- Name: mentor_assignment mentor_assignment_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."mentor_assignment"
    ADD CONSTRAINT "mentor_assignment_pkey" PRIMARY KEY ("team");


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id");


--
-- Name: event_registrations registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."event_registrations"
    ADD CONSTRAINT "registrations_pkey" PRIMARY KEY ("user_id", "event_id");


--
-- Name: signup_info signup_info_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."signup_info"
    ADD CONSTRAINT "signup_info_pkey" PRIMARY KEY ("email");


--
-- Name: sponsors sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."sponsors"
    ADD CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id");


--
-- Name: team_members team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."team_members"
    ADD CONSTRAINT "team_members_pkey" PRIMARY KEY ("user_id", "team_id");


--
-- Name: team_requests team_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."team_requests"
    ADD CONSTRAINT "team_requests_pkey" PRIMARY KEY ("user_id", "team_id");


--
-- Name: team_requests team_requests_user_id_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."team_requests"
    ADD CONSTRAINT "team_requests_user_id_key" UNIQUE ("user_id");


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("id");


--
-- Name: team_members on_member_delete; Type: TRIGGER; Schema: public; Owner: supabase_admin
--

CREATE TRIGGER "on_member_delete" AFTER DELETE ON "public"."team_members" FOR EACH ROW EXECUTE FUNCTION "public"."archive_if_empty"();


--
-- Name: profiles on_profile_update; Type: TRIGGER; Schema: public; Owner: supabase_admin
--

CREATE TRIGGER "on_profile_update" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."restrict_role_update"();


--
-- Name: teams on_team_insert; Type: TRIGGER; Schema: public; Owner: supabase_admin
--

CREATE TRIGGER "on_team_insert" AFTER INSERT ON "public"."teams" FOR EACH ROW EXECUTE FUNCTION "public"."add_first_member"();


--
-- Name: mentor_assignment mentor_assignment_mentor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."mentor_assignment"
    ADD CONSTRAINT "mentor_assignment_mentor_fkey" FOREIGN KEY ("mentor") REFERENCES "public"."profiles"("user_id");


--
-- Name: mentor_assignment mentor_assignment_team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."mentor_assignment"
    ADD CONSTRAINT "mentor_assignment_team_fkey" FOREIGN KEY ("team") REFERENCES "public"."teams"("id");


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");


--
-- Name: event_registrations registrations_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."event_registrations"
    ADD CONSTRAINT "registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");


--
-- Name: event_registrations registrations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."event_registrations"
    ADD CONSTRAINT "registrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id");


--
-- Name: team_members team_members_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."team_members"
    ADD CONSTRAINT "team_members_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;


--
-- Name: team_members team_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."team_members"
    ADD CONSTRAINT "team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id") ON DELETE CASCADE;


--
-- Name: team_requests team_requests_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."team_requests"
    ADD CONSTRAINT "team_requests_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;


--
-- Name: team_requests team_requests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY "public"."team_requests"
    ADD CONSTRAINT "team_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id") ON DELETE CASCADE;


--
-- Name: events Allow admin delete access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow admin delete access" ON "public"."events" FOR DELETE USING ("public"."isadmin"("auth"."uid"()));


--
-- Name: events Allow admin insert access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow admin insert access" ON "public"."events" FOR INSERT WITH CHECK ("public"."isadmin"("auth"."uid"()));


--
-- Name: sponsors Allow admins delete access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow admins delete access" ON "public"."sponsors" FOR DELETE USING ("public"."isadmin"("auth"."uid"()));


--
-- Name: sponsors Allow admins insert access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow admins insert access" ON "public"."sponsors" FOR INSERT WITH CHECK ("public"."isadmin"("auth"."uid"()));


--
-- Name: event_registrations Allow admins read access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow admins read access" ON "public"."event_registrations" FOR SELECT USING ("public"."isadmin"("auth"."uid"()));


--
-- Name: sponsors Allow admins update access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow admins update access" ON "public"."sponsors" FOR UPDATE USING ("public"."isadmin"("auth"."uid"()));


--
-- Name: events Allow admins write access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow admins write access" ON "public"."events" FOR UPDATE USING ("public"."isadmin"("auth"."uid"()));


--
-- Name: event_registrations Allow individual delete access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow individual delete access" ON "public"."event_registrations" FOR DELETE USING (("auth"."uid"() = "user_id"));


--
-- Name: team_requests Allow individual delete access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow individual delete access" ON "public"."team_requests" FOR DELETE USING (("auth"."uid"() = "user_id"));


--
-- Name: team_requests Allow individual read access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow individual read access" ON "public"."team_requests" FOR SELECT USING (("auth"."uid"() = "user_id"));


--
-- Name: event_registrations Allow individuals insert access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow individuals insert access" ON "public"."event_registrations" FOR INSERT TO "authenticated" WITH CHECK (("user_id" = "auth"."uid"()));


--
-- Name: event_registrations Allow individuals read access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow individuals read access" ON "public"."event_registrations" FOR SELECT USING (("auth"."uid"() = "user_id"));


--
-- Name: team_requests Allow logged-in user insert access if not member of a team and ; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow logged-in user insert access if not member of a team and " ON "public"."team_requests" FOR INSERT TO "anon", "authenticated" WITH CHECK ((NOT ("auth"."uid"() IN ( SELECT "team_members"."user_id"
   FROM "public"."team_members"))));


--
-- Name: teams Allow logged-in user insert access if not member of another tea; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow logged-in user insert access if not member of another tea" ON "public"."teams" FOR INSERT WITH CHECK ((NOT ("auth"."uid"() IN ( SELECT "team_members"."user_id"
   FROM "public"."team_members"))));


--
-- Name: team_requests Allow team members delete access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow team members delete access" ON "public"."team_requests" FOR DELETE USING (("team_id" IN ( SELECT "team_members"."team_id"
   FROM "public"."team_members"
  WHERE ("team_members"."user_id" = "auth"."uid"()))));


--
-- Name: team_requests Allow team members read access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow team members read access" ON "public"."team_requests" FOR SELECT USING (("auth"."uid"() IN ( SELECT "team_members"."user_id"
   FROM "public"."team_members")));


--
-- Name: team_members Allow team-members delete individual delete access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow team-members delete individual delete access" ON "public"."team_members" FOR DELETE USING (("user_id" = "auth"."uid"()));


--
-- Name: events Enable read access for all users; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable read access for all users" ON "public"."events" FOR SELECT USING (true);


--
-- Name: faqs Enable read access for all users; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable read access for all users" ON "public"."faqs" FOR SELECT USING (true);


--
-- Name: mentor_assignment Enable read access for all users; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable read access for all users" ON "public"."mentor_assignment" FOR SELECT USING (true);


--
-- Name: sponsors Enable read access for all users; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable read access for all users" ON "public"."sponsors" FOR SELECT USING (true);


--
-- Name: profiles Enable read access for anon and authenticated; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable read access for anon and authenticated" ON "public"."profiles" FOR SELECT TO "anon", "authenticated" USING (true);


--
-- Name: team_members Enable read access for anon and authenticated; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable read access for anon and authenticated" ON "public"."team_members" FOR SELECT TO "anon", "authenticated" USING (true);


--
-- Name: teams Enable read access for authenticated users and anon only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable read access for authenticated users and anon only" ON "public"."teams" FOR SELECT TO "anon", "authenticated" USING (true);


--
-- Name: signup_info Everyone can insert; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Everyone can insert" ON "public"."signup_info" FOR INSERT WITH CHECK (true);


--
-- Name: profiles Users can update own profile; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "user_id"));


--
-- Name: profiles admins can update profiles; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "admins can update profiles" ON "public"."profiles" FOR UPDATE TO "authenticated" USING ("public"."isadmin"("auth"."uid"()));


--
-- Name: mentor_assignment admins have full control; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "admins have full control" ON "public"."mentor_assignment" TO "authenticated" USING ("public"."isadmin"("auth"."uid"())) WITH CHECK ("public"."isadmin"("auth"."uid"()));


--
-- Name: teams allow team members update access; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "allow team members update access" ON "public"."teams" FOR UPDATE USING (("auth"."uid"() IN ( SELECT "team_members"."user_id"
   FROM "public"."team_members"
  WHERE ("team_members"."team_id" = "teams"."id"))));


--
-- Name: event_backup19_08_2022; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."event_backup19_08_2022" ENABLE ROW LEVEL SECURITY;

--
-- Name: event_registrations; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."event_registrations" ENABLE ROW LEVEL SECURITY;

--
-- Name: events; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;

--
-- Name: signup_info everyone can read; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "everyone can read" ON "public"."signup_info" FOR SELECT USING (true);


--
-- Name: faqs; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."faqs" ENABLE ROW LEVEL SECURITY;

--
-- Name: mentor_assignment; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."mentor_assignment" ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

--
-- Name: signup_info; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."signup_info" ENABLE ROW LEVEL SECURITY;

--
-- Name: sponsors; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."sponsors" ENABLE ROW LEVEL SECURITY;

--
-- Name: team_members; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."team_members" ENABLE ROW LEVEL SECURITY;

--
-- Name: team_requests; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."team_requests" ENABLE ROW LEVEL SECURITY;

--
-- Name: teams; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."teams" ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA "public"; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


--
-- Name: FUNCTION "algorithm_sign"("signables" "text", "secret" "text", "algorithm" "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."algorithm_sign"("signables" "text", "secret" "text", "algorithm" "text") TO "dashboard_user";


--
-- Name: FUNCTION "armor"("bytea"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."armor"("bytea") TO "dashboard_user";


--
-- Name: FUNCTION "armor"("bytea", "text"[], "text"[]); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."armor"("bytea", "text"[], "text"[]) TO "dashboard_user";


--
-- Name: FUNCTION "crypt"("text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."crypt"("text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "dearmor"("text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."dearmor"("text") TO "dashboard_user";


--
-- Name: FUNCTION "decrypt"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."decrypt"("bytea", "bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "decrypt_iv"("bytea", "bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."decrypt_iv"("bytea", "bytea", "bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "digest"("bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."digest"("bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "digest"("text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."digest"("text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "encrypt"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."encrypt"("bytea", "bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "encrypt_iv"("bytea", "bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."encrypt_iv"("bytea", "bytea", "bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "gen_random_bytes"(integer); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."gen_random_bytes"(integer) TO "dashboard_user";


--
-- Name: FUNCTION "gen_random_uuid"(); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."gen_random_uuid"() TO "dashboard_user";


--
-- Name: FUNCTION "gen_salt"("text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."gen_salt"("text") TO "dashboard_user";


--
-- Name: FUNCTION "gen_salt"("text", integer); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."gen_salt"("text", integer) TO "dashboard_user";


--
-- Name: FUNCTION "hmac"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."hmac"("bytea", "bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "hmac"("text", "text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."hmac"("text", "text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pg_stat_statements"("showtext" boolean, OUT "userid" "oid", OUT "dbid" "oid", OUT "toplevel" boolean, OUT "queryid" bigint, OUT "query" "text", OUT "plans" bigint, OUT "total_plan_time" double precision, OUT "min_plan_time" double precision, OUT "max_plan_time" double precision, OUT "mean_plan_time" double precision, OUT "stddev_plan_time" double precision, OUT "calls" bigint, OUT "total_exec_time" double precision, OUT "min_exec_time" double precision, OUT "max_exec_time" double precision, OUT "mean_exec_time" double precision, OUT "stddev_exec_time" double precision, OUT "rows" bigint, OUT "shared_blks_hit" bigint, OUT "shared_blks_read" bigint, OUT "shared_blks_dirtied" bigint, OUT "shared_blks_written" bigint, OUT "local_blks_hit" bigint, OUT "local_blks_read" bigint, OUT "local_blks_dirtied" bigint, OUT "local_blks_written" bigint, OUT "temp_blks_read" bigint, OUT "temp_blks_written" bigint, OUT "blk_read_time" double precision, OUT "blk_write_time" double precision, OUT "wal_records" bigint, OUT "wal_fpi" bigint, OUT "wal_bytes" numeric); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pg_stat_statements"("showtext" boolean, OUT "userid" "oid", OUT "dbid" "oid", OUT "toplevel" boolean, OUT "queryid" bigint, OUT "query" "text", OUT "plans" bigint, OUT "total_plan_time" double precision, OUT "min_plan_time" double precision, OUT "max_plan_time" double precision, OUT "mean_plan_time" double precision, OUT "stddev_plan_time" double precision, OUT "calls" bigint, OUT "total_exec_time" double precision, OUT "min_exec_time" double precision, OUT "max_exec_time" double precision, OUT "mean_exec_time" double precision, OUT "stddev_exec_time" double precision, OUT "rows" bigint, OUT "shared_blks_hit" bigint, OUT "shared_blks_read" bigint, OUT "shared_blks_dirtied" bigint, OUT "shared_blks_written" bigint, OUT "local_blks_hit" bigint, OUT "local_blks_read" bigint, OUT "local_blks_dirtied" bigint, OUT "local_blks_written" bigint, OUT "temp_blks_read" bigint, OUT "temp_blks_written" bigint, OUT "blk_read_time" double precision, OUT "blk_write_time" double precision, OUT "wal_records" bigint, OUT "wal_fpi" bigint, OUT "wal_bytes" numeric) TO "dashboard_user";


--
-- Name: FUNCTION "pg_stat_statements_info"(OUT "dealloc" bigint, OUT "stats_reset" timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pg_stat_statements_info"(OUT "dealloc" bigint, OUT "stats_reset" timestamp with time zone) TO "dashboard_user";


--
-- Name: FUNCTION "pg_stat_statements_reset"("userid" "oid", "dbid" "oid", "queryid" bigint); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pg_stat_statements_reset"("userid" "oid", "dbid" "oid", "queryid" bigint) TO "dashboard_user";


--
-- Name: FUNCTION "pgp_armor_headers"("text", OUT "key" "text", OUT "value" "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_armor_headers"("text", OUT "key" "text", OUT "value" "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_key_id"("bytea"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_key_id"("bytea") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_decrypt"("bytea", "bytea"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt"("bytea", "bytea") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_decrypt"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt"("bytea", "bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_decrypt"("bytea", "bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt"("bytea", "bytea", "text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_decrypt_bytea"("bytea", "bytea"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt_bytea"("bytea", "bytea") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_decrypt_bytea"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt_bytea"("bytea", "bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_decrypt_bytea"("bytea", "bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt_bytea"("bytea", "bytea", "text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_encrypt"("text", "bytea"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt"("text", "bytea") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_encrypt"("text", "bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt"("text", "bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_encrypt_bytea"("bytea", "bytea"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt_bytea"("bytea", "bytea") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_pub_encrypt_bytea"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt_bytea"("bytea", "bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_sym_decrypt"("bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt"("bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_sym_decrypt"("bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt"("bytea", "text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_sym_decrypt_bytea"("bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt_bytea"("bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_sym_decrypt_bytea"("bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt_bytea"("bytea", "text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_sym_encrypt"("text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt"("text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_sym_encrypt"("text", "text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt"("text", "text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_sym_encrypt_bytea"("bytea", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt_bytea"("bytea", "text") TO "dashboard_user";


--
-- Name: FUNCTION "pgp_sym_encrypt_bytea"("bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt_bytea"("bytea", "text", "text") TO "dashboard_user";


--
-- Name: FUNCTION "sign"("payload" "json", "secret" "text", "algorithm" "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."sign"("payload" "json", "secret" "text", "algorithm" "text") TO "dashboard_user";


--
-- Name: FUNCTION "try_cast_double"("inp" "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."try_cast_double"("inp" "text") TO "dashboard_user";


--
-- Name: FUNCTION "url_decode"("data" "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."url_decode"("data" "text") TO "dashboard_user";


--
-- Name: FUNCTION "url_encode"("data" "bytea"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."url_encode"("data" "bytea") TO "dashboard_user";


--
-- Name: FUNCTION "uuid_generate_v1"(); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v1"() TO "dashboard_user";


--
-- Name: FUNCTION "uuid_generate_v1mc"(); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v1mc"() TO "dashboard_user";


--
-- Name: FUNCTION "uuid_generate_v3"("namespace" "uuid", "name" "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v3"("namespace" "uuid", "name" "text") TO "dashboard_user";


--
-- Name: FUNCTION "uuid_generate_v4"(); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v4"() TO "dashboard_user";


--
-- Name: FUNCTION "uuid_generate_v5"("namespace" "uuid", "name" "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v5"("namespace" "uuid", "name" "text") TO "dashboard_user";


--
-- Name: FUNCTION "uuid_nil"(); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_nil"() TO "dashboard_user";


--
-- Name: FUNCTION "uuid_ns_dns"(); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_ns_dns"() TO "dashboard_user";


--
-- Name: FUNCTION "uuid_ns_oid"(); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_ns_oid"() TO "dashboard_user";


--
-- Name: FUNCTION "uuid_ns_url"(); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_ns_url"() TO "dashboard_user";


--
-- Name: FUNCTION "uuid_ns_x500"(); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."uuid_ns_x500"() TO "dashboard_user";


--
-- Name: FUNCTION "verify"("token" "text", "secret" "text", "algorithm" "text"); Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON FUNCTION "extensions"."verify"("token" "text", "secret" "text", "algorithm" "text") TO "dashboard_user";


--
-- Name: FUNCTION "accept_request"("requesting_user_id" "uuid"); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "public"."accept_request"("requesting_user_id" "uuid") TO "postgres";
GRANT ALL ON FUNCTION "public"."accept_request"("requesting_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."accept_request"("requesting_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."accept_request"("requesting_user_id" "uuid") TO "service_role";


--
-- Name: FUNCTION "add_first_member"(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "public"."add_first_member"() TO "postgres";
GRANT ALL ON FUNCTION "public"."add_first_member"() TO "anon";
GRANT ALL ON FUNCTION "public"."add_first_member"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_first_member"() TO "service_role";


--
-- Name: FUNCTION "archive_if_empty"(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "public"."archive_if_empty"() TO "postgres";
GRANT ALL ON FUNCTION "public"."archive_if_empty"() TO "anon";
GRANT ALL ON FUNCTION "public"."archive_if_empty"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."archive_if_empty"() TO "service_role";


--
-- Name: FUNCTION "handle_new_user"(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "postgres";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


--
-- Name: FUNCTION "isadmin"("user_id" "uuid"); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "public"."isadmin"("user_id" "uuid") TO "postgres";
GRANT ALL ON FUNCTION "public"."isadmin"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."isadmin"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."isadmin"("user_id" "uuid") TO "service_role";


--
-- Name: FUNCTION "restrict_role_update"(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "public"."restrict_role_update"() TO "postgres";
GRANT ALL ON FUNCTION "public"."restrict_role_update"() TO "anon";
GRANT ALL ON FUNCTION "public"."restrict_role_update"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."restrict_role_update"() TO "service_role";


--
-- Name: TABLE "pg_stat_statements"; Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON TABLE "extensions"."pg_stat_statements" TO "dashboard_user";


--
-- Name: TABLE "pg_stat_statements_info"; Type: ACL; Schema: extensions; Owner: postgres
--

GRANT ALL ON TABLE "extensions"."pg_stat_statements_info" TO "dashboard_user";


--
-- Name: TABLE "event_backup19_08_2022"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."event_backup19_08_2022" TO "postgres";
GRANT ALL ON TABLE "public"."event_backup19_08_2022" TO "anon";
GRANT ALL ON TABLE "public"."event_backup19_08_2022" TO "authenticated";
GRANT ALL ON TABLE "public"."event_backup19_08_2022" TO "service_role";


--
-- Name: TABLE "event_registrations"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."event_registrations" TO "postgres";
GRANT ALL ON TABLE "public"."event_registrations" TO "anon";
GRANT ALL ON TABLE "public"."event_registrations" TO "authenticated";
GRANT ALL ON TABLE "public"."event_registrations" TO "service_role";


--
-- Name: TABLE "events"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."events" TO "postgres";
GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";


--
-- Name: SEQUENCE "events_id_seq"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "postgres";
GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "service_role";


--
-- Name: TABLE "faqs"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."faqs" TO "postgres";
GRANT ALL ON TABLE "public"."faqs" TO "anon";
GRANT ALL ON TABLE "public"."faqs" TO "authenticated";
GRANT ALL ON TABLE "public"."faqs" TO "service_role";


--
-- Name: SEQUENCE "faqs_id_seq"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE "public"."faqs_id_seq" TO "postgres";
GRANT ALL ON SEQUENCE "public"."faqs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."faqs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."faqs_id_seq" TO "service_role";


--
-- Name: TABLE "mentor_assignment"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."mentor_assignment" TO "postgres";
GRANT ALL ON TABLE "public"."mentor_assignment" TO "anon";
GRANT ALL ON TABLE "public"."mentor_assignment" TO "authenticated";
GRANT ALL ON TABLE "public"."mentor_assignment" TO "service_role";


--
-- Name: TABLE "profiles"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."profiles" TO "postgres";
GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";


--
-- Name: TABLE "signup_info"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."signup_info" TO "postgres";
GRANT ALL ON TABLE "public"."signup_info" TO "anon";
GRANT ALL ON TABLE "public"."signup_info" TO "authenticated";
GRANT ALL ON TABLE "public"."signup_info" TO "service_role";


--
-- Name: TABLE "sponsors"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."sponsors" TO "postgres";
GRANT ALL ON TABLE "public"."sponsors" TO "anon";
GRANT ALL ON TABLE "public"."sponsors" TO "authenticated";
GRANT ALL ON TABLE "public"."sponsors" TO "service_role";


--
-- Name: SEQUENCE "sponsors_id_seq"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE "public"."sponsors_id_seq" TO "postgres";
GRANT ALL ON SEQUENCE "public"."sponsors_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."sponsors_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."sponsors_id_seq" TO "service_role";


--
-- Name: TABLE "team_members"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."team_members" TO "postgres";
GRANT ALL ON TABLE "public"."team_members" TO "anon";
GRANT ALL ON TABLE "public"."team_members" TO "authenticated";
GRANT ALL ON TABLE "public"."team_members" TO "service_role";


--
-- Name: TABLE "team_requests"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."team_requests" TO "postgres";
GRANT ALL ON TABLE "public"."team_requests" TO "anon";
GRANT ALL ON TABLE "public"."team_requests" TO "authenticated";
GRANT ALL ON TABLE "public"."team_requests" TO "service_role";


--
-- Name: TABLE "teams"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE "public"."teams" TO "postgres";
GRANT ALL ON TABLE "public"."teams" TO "anon";
GRANT ALL ON TABLE "public"."teams" TO "authenticated";
GRANT ALL ON TABLE "public"."teams" TO "service_role";


--
-- Name: SEQUENCE "teams_id_seq"; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "postgres";
GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";


--
-- PostgreSQL database dump complete
--

RESET ALL;
