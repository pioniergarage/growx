import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "./supabase";

export const getFAQs = async () => await supabaseClient
    .from<definitions["faqs"]>('faqs')
    .select('*');

