import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'database/DatabaseDefition';
import { Profile } from 'modules/profile/types';
import resizeImage from 'utils/resize';

export const fetchUserAvatar = (supabaseClient: SupabaseClient<Database>, avatar: string) =>
    supabaseClient.storage
        .from('avatars')
        .download(avatar)
        .then(({ data, error }) => {
            if (error || !data) {
                throw new Error(error?.message || avatar + ' not found');
            }
            return data;
        });

export const uploadUserAvatar = async (supabaseClient: SupabaseClient<Database>, profile: Profile, avatar: File) => {
    const fileName = `${profile.userId}.jpg`;
    const filePath = `${fileName}`;
    const resizedImage = await resizeImage(avatar, 200, 200);
    return supabaseClient.storage
        .from('avatars')
        .upload(filePath, resizedImage, { upsert: true })
        .then(({ error, data }) => {
            if (error || !data) {
                throw new Error(error?.message || 'Something went wrong');
            }
            return filePath;
        });
};
