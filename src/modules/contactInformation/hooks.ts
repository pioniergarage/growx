import { useSupabaseClient, useUser } from '@/components/providers/SupabaseProvider';
import { useMutation, useQuery, useQueryClient } from "react-query";
import contactInformationApi from "./api";
import { ContactInformation } from "./types";

export const useContactInformation = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser()
    const query = useQuery(
        ['contact_information', user?.id],
        async () => {
            if (user) {
                return await contactInformationApi.getContactInformation(supabaseClient, user?.id)
            } else {
                throw new Error("Query should be disabled because user is undefined")
            }
        },
        {
            enabled: !!user
        }
    )
    return { ...query, contactInformation: query.data }
}

export const useInsertContactInformation = () => {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();
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
    const supabaseClient = useSupabaseClient();
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