import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Team, Profile } from "model";
import { mapProfileDto } from "./profile";
import { definitions } from "./supabase";
import { mapResponse, SupabaseResponse, mapSingleResponse } from "./utils";

export async function createTeam(team: Team) {
    const response = await supabaseClient
        .from<definitions["teams"]>('teams')
        .insert(team, { returning: "representation" })
    return mapResponse(response, t => t)
}

export async function leaveTeam(user_id: string) {
    return await supabaseClient
        .from<definitions["team_members"]>('team_members')
        .delete()
        .eq('user_id', user_id);
}

export async function requestToJoinTeam(userId: string, teamId: number) {
    return await supabaseClient
        .from<definitions["team_requests"]>('team_requests')
        .insert({ user_id: userId, team_id: teamId })
}

export async function acceptRequestToJoinTeam(joiningUserId: string) {
    // team id is determined by rpc function
    return await supabaseClient.rpc('accept_request', { requesting_user_id: joiningUserId })
}

export async function getRequestsToJoinTeam(team_id: number): Promise<SupabaseResponse<Profile[]>> {
    const response = await supabaseClient
        .from<{ profiles: definitions["profiles"] & { user_roles: Pick<definitions['user_roles'], 'role'> } }>("team_requests")
        .select('profiles (*, user_roles(role))')
        .match({ team_id })
    return mapResponse(response, r => mapProfileDto(r.profiles))
}

export async function getTeamRequestedToJoin(user_id: string) {
    const response = await supabaseClient
        .from<definitions["teams"]>('teams')
        .select('*')
        .match({ user_id })
        .maybeSingle()
    return mapSingleResponse<definitions["teams"], Team>(response, teamDto => ({ ...teamDto, tags: teamDto.tags as string[] }))
}

export async function getTeams(): Promise<SupabaseResponse<Team[]>> {
    const response = await supabaseClient
        .from<definitions["teams"]>('teams')
        .select('*')
    return mapResponse(response, teamDto => ({ ...teamDto, tags: teamDto.tags as string[] }))
}

export async function getTeam(user_id: string): Promise<SupabaseResponse<Team>> {
    const response = await supabaseClient
        .from<definitions["teams"]>('teams')
        .select('*, team_members (user_id)')
        .match({ user_id })
        .single()
    return mapSingleResponse(response, teamDto => ({ ...teamDto, tags: teamDto.tags as string[] }))
}