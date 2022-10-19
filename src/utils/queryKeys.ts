const QUERY_KEYS = {
    admin: (userId?: string) => ['admin', userId],
    profiles: () => ['profiles'],
    profile: (userId?: string) => ['profile', userId],
    contactInformation: (userId?: string) => ['contact', userId],
    avatar: (userId?: string) => ['avatar', userId],
    event: (id: number) => ['event', id],
    events: () => 'events',
    registrationsToEvent: (eventId: number) => ['registrations', eventId],
    registrationsOfUser: (userId?: string) =>
        userId ? ['registrationsOfUser', userId] : ['registrationsOfUser'],
    sponsors: () => ['sponsors'],
    teamMembers: (teamId?: number) =>
        teamId ? ['members', teamId] : ['members'],
    currentTeam: () => 'currentTeamId',
    team: (teamId?: number) => (teamId ? ['team', teamId] : ['team']),
    teams: () => 'teams',
    teamRequestsOfTeam: (teamId?: number) =>
        teamId ? ['teamRequests', teamId] : ['teamRequests'],
    currentRequestToTeam: () => 'currentTeamRequest',
    mentorAssignments: () => 'mentorAssignments',
    teamMentor: () => 'teamMentor'
};

export default QUERY_KEYS;
