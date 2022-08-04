
import { Sponsor } from "types"
import createSupabaseHook from "./createSupabaseHook"

const useSponsors = () => createSupabaseHook<Sponsor>('sponsors')
export default useSponsors
