CREATE FUNCTION public.save_signup_info(
    p_has_team boolean,
    p_idea text,
    p_expectations text,
    p_source text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    account_email text := auth.jwt() ->> 'email';
BEGIN
    IF auth.uid() IS NULL OR NULLIF(account_email, '') IS NULL THEN
        RAISE EXCEPTION 'A signed-in account with an email is required.'
            USING ERRCODE = '42501';
    END IF;

    INSERT INTO public.signup_info (email, "lookingForTeam", idea, expectations, source)
    VALUES (account_email, p_has_team, p_idea, p_expectations, p_source)
    ON CONFLICT (email) DO UPDATE SET
        "lookingForTeam" = EXCLUDED."lookingForTeam",
        idea = EXCLUDED.idea,
        expectations = EXCLUDED.expectations,
        source = EXCLUDED.source;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.save_signup_info(boolean, text, text, text)
    FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_signup_info(boolean, text, text, text)
    TO authenticated;
