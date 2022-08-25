import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Profile } from 'model';
import resizeImage from 'utils/resize';

export const fetchUserAvatar = (avatar: string) =>
    supabaseClient.storage
        .from('avatars')
        .download(avatar)
        .then(({ data, error }) => {
            if (error || !data) {
                throw new Error(error?.message || avatar + ' not found');
            }
            return data;
        });

export const uploadUserAvatar = async (profile: Profile, avatar: File) => {
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
            return data.Key;
        });
};
