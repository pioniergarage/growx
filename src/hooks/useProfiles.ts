
import { ProfileDto } from "types"
import createSupabaseHook from "./createSupabaseHook"

const useProfiles = () => createSupabaseHook<ProfileDto>('profiles')
export default useProfiles