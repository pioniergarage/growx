import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Team, Profile } from "model";
import { mapProfileDto } from "./profile";
import { definitions } from "./supabase";
import { mapResponse, SupabaseResponse, mapSingleResponse } from "./utils";

export async function createTeam(team: Partial<Team>) {
    const response = await supabaseClient
        .from<definitions["teams"]>('teams')
        .insert(team, { returning: "representation" })
        .single()
    return mapSingleResponse(response, t => t)
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

export async function getTeamOfUser(user_id: string): Promise<SupabaseResponse<Team>> {
    const response = await supabaseClient
        .from<definitions["teams"]>('teams')
        .select('*, team_members (user_id)')
        .match({ user_id })
        .single()
    return mapSingleResponse(response, teamDto => ({ ...teamDto, tags: teamDto.tags as string[] }))
}

export async function getTeamWithMembers(teamId: number): Promise<SupabaseResponse<Team & { members: Profile[] }>> {
    const response = await supabaseClient
        .from<definitions["teams"] & { team_members: { profiles: definitions["profiles"] }[] }>('teams')
        .select('*, team_members (profiles (*))')
        .match({ id: teamId })
        .single()
    return mapSingleResponse(response, dto => ({
        name: dto.name,
        description: dto.description,
        tags: dto.tags as string[],
        id: dto.id,
        members: dto.team_members.map(m => mapProfileDto(m.profiles)),
        logo: dto.logo
    }))
}