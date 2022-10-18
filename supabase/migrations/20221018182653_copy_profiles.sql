INSERT INTO public.profile (user_id,  type,         avatar, inserted_at, forename,   surname,   gender, is_student, bio)
SELECT                      user_id, 'PARTICIPANT', avatar, inserted_at, first_name, last_name, gender, university IS NOT NULL, coalesce(bio, '') FROM profiles
where NOT EXISTS (select user_id  FROM public.profile where user_id = profiles.user_id);

UPDATE profile
SET type = 'MENTOR'
WHERE EXISTS (SELECT * FROM profiles WHERE profiles.user_id = profile.user_id AND role = 'MENTOR');

UPDATE profile
SET type = 'BUDDY'
WHERE EXISTS (SELECT * FROM profiles WHERE profiles.user_id = profile.user_id AND role = 'BUDDY');

UPDATE profile
SET type = 'EXPERT'
WHERE EXISTS (SELECT * FROM profiles WHERE profiles.user_id = profile.user_id AND role = 'EXPERT');

CREATE OR REPLACE FUNCTION json_array_to_text_array(_js json)
  RETURNS text[]
  LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT AS
'SELECT ARRAY(SELECT json_array_elements_text(_js))';

UPDATE profile
SET skills = json_array_to_text_array(profiles.skills)
FROM profiles WHERE profiles.skills IS NOT NULL;

UPDATE profile
SET skills = (
  SELECT json_array_to_text_array(profiles.skills)
  FROM profiles WHERE profiles.skills IS NOT NULL AND profile.user_id = profiles.user_id
);

INSERT INTO public.contact_information (user_id, email, phone, country)
SELECT user_id, email, phone, homeland FROM profiles
where NOT EXISTS (select user_id  FROM public.contact_information where user_id = profiles.user_id);


INSERT INTO public.student (user_id, studies, university, university_country, sq)
SELECT user_id, studies, university, "universityCountry", "keyQualification" FROM profiles
where NOT EXISTS (select user_id  FROM public.student where user_id = profiles.user_id);