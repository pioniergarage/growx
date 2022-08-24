import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Profile } from "model";
import resizeImage from "utils/resize";
import { updateProfile } from "./profile";

export const fetchUserAvatar = async (avatar: string) => await supabaseClient.storage
    .from('avatars')
    .download(avatar);

export const uploadUserAvatar = async (profile: Profile, avatar: File) => {
    const fileName = `${profile.userId}.jpg`;
    const filePath = `${fileName}`;
    const resizedImage = await resizeImage(avatar, 200, 200);
    const { error } = await supabaseClient.storage
        .from('avatars')
        .upload(filePath, resizedImage, { upsert: true });
    if (error) return { error }
    return await updateProfile(profile.userId, { ...profile, avatar: fileName })
}