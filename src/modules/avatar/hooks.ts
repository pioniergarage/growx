import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "database/DatabaseDefition";
import { useUpsertProfile } from "modules/profile/hooks";
import { Profile } from "modules/profile/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "utils/queryKeys";
import { fetchUserAvatar, uploadUserAvatar } from "./api";

export function useAvatarUrl({
    userId,
    avatar,
}: {
    userId?: Profile['user_id'];
    avatar: Profile['avatar'];
}) {
    const supabaseClient = useSupabaseClient<Database>();
    const result = useQuery(
        QUERY_KEYS.avatar(userId),
        async () => {
            if (!avatar) {
                return null;
            }
            const blob = await fetchUserAvatar(supabaseClient, avatar);
            return URL.createObjectURL(blob);
        },
        { enabled: !!userId }
    );
    return { ...result, avatarUrl: result.data };
}

export function useUploadAvatar() {
    const supabaseClient = useSupabaseClient<Database>();
    const queryClient = useQueryClient();
    const { updateProfile } = useUpsertProfile();
    const mutation = useMutation(
        ({ profile, file }: { profile: Profile; file: File }) =>
            uploadUserAvatar(supabaseClient, profile, file),
        {
            onSuccess: async (filename, { profile, file }) => {
                updateProfile({ ...profile, avatar: filename });
                queryClient.setQueryData(
                    QUERY_KEYS.avatar(profile.user_id),
                    URL.createObjectURL(file)
                );
            },
        }
    );
    return { ...mutation, uploadUserAvatar: mutation.mutateAsync };
}
