import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "database/DatabaseDefition";
import { useMutation, useQuery, useQueryClient } from "react-query";
import contactInformationApi from "./api";
import { ContactInformation } from "./types";

export const useGetContactInformation = (userId: string) => {
    const supabaseClient = useSupabaseClient<Database>();
    const mutation = useQuery(
        ['contact_information', userId],
        async () => await contactInformationApi.getContactInformation(supabaseClient, userId)
    )
    return { ...mutation, contactInformation: mutation.data }
}

export const useInsertContactInformation = () => {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient<Database>();
    const mutation = useMutation(
        async (payload: { info: ContactInformation, userId: string }) => {
            return contactInformationApi.insertContactInformation(supabaseClient, payload.userId, payload.info)
        },
        {
            onSuccess: (inserted, { userId }) => {
                queryClient.setQueryData(['contact_information', userId], inserted)
            }
        }
    );
    return { ...mutation, insertContactInformation: mutation.mutateAsync };
}

export const useUpdateContactInformation = () => {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient<Database>();
    const mutation = useMutation(
        async (payload: { info: ContactInformation, userId: string }) => {
            return contactInformationApi.updateContactInformation(supabaseClient, payload.userId, payload.info)
        },
        {
            onSuccess: (inserted, { userId }) => {
                queryClient.setQueryData(['contact_information', userId], inserted)
            }
        }
    );
    return { ...mutation, updateContactInformation: mutation.mutateAsync };
}