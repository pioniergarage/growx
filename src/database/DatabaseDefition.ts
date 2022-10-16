export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            events: {
                Row: {
                    id: number;
                    inserted_at: string;
                    updated_at: string;
                    title: string;
                    date: string;
                    description: string;
                    mandatory: boolean;
                    location: string;
                    sq_mandatory: boolean;
                    type: Database['public']['Enums']['enum_event_type'] | null;
                };
                Insert: {
                    id?: number;
                    inserted_at?: string;
                    updated_at?: string;
                    title?: string;
                    date?: string;
                    description?: string;
                    mandatory?: boolean;
                    location: string;
                    sq_mandatory?: boolean;
                    type?:
                        | Database['public']['Enums']['enum_event_type']
                        | null;
                };
                Update: {
                    id?: number;
                    inserted_at?: string;
                    updated_at?: string;
                    title?: string;
                    date?: string;
                    description?: string;
                    mandatory?: boolean;
                    location?: string;
                    sq_mandatory?: boolean;
                    type?:
                        | Database['public']['Enums']['enum_event_type']
                        | null;
                };
            };
            team_requests: {
                Row: {
                    inserted_at: string;
                    user_id: string;
                    team_id: number;
                };
                Insert: {
                    inserted_at?: string;
                    user_id: string;
                    team_id: number;
                };
                Update: {
                    inserted_at?: string;
                    user_id?: string;
                    team_id?: number;
                };
            };
            profiles: {
                Row: {
                    user_id: string;
                    inserted_at: string;
                    first_name: string;
                    last_name: string;
                    email: string;
                    gender: Database['public']['Enums']['gender'] | null;
                    phone: string | null;
                    studies: string | null;
                    university: string | null;
                    homeland: string | null;
                    avatar: string | null;
                    role: Database['public']['Enums']['user_role'];
                    skills: Json;
                    bio: string | null;
                    keyQualification: boolean;
                    universityCountry: string | null;
                };
                Insert: {
                    user_id: string;
                    inserted_at?: string;
                    first_name?: string;
                    last_name?: string;
                    email?: string;
                    gender?: Database['public']['Enums']['gender'] | null;
                    phone?: string | null;
                    studies?: string | null;
                    university?: string | null;
                    homeland?: string | null;
                    avatar?: string | null;
                    role?: Database['public']['Enums']['user_role'];
                    skills?: Json;
                    bio?: string | null;
                    keyQualification?: boolean;
                    universityCountry?: string | null;
                };
                Update: {
                    user_id?: string;
                    inserted_at?: string;
                    first_name?: string;
                    last_name?: string;
                    email?: string;
                    gender?: Database['public']['Enums']['gender'] | null;
                    phone?: string | null;
                    studies?: string | null;
                    university?: string | null;
                    homeland?: string | null;
                    avatar?: string | null;
                    role?: Database['public']['Enums']['user_role'];
                    skills?: Json;
                    bio?: string | null;
                    keyQualification?: boolean;
                    universityCountry?: string | null;
                };
            };
            signup_info: {
                Row: {
                    created_at: string | null;
                    lookingForTeam: boolean;
                    idea: string;
                    expectations: string;
                    source: string;
                    email: string;
                };
                Insert: {
                    created_at?: string | null;
                    lookingForTeam?: boolean;
                    idea?: string;
                    expectations?: string;
                    source?: string;
                    email?: string;
                };
                Update: {
                    created_at?: string | null;
                    lookingForTeam?: boolean;
                    idea?: string;
                    expectations?: string;
                    source?: string;
                    email?: string;
                };
            };
            event_backup19_08_2022: {
                Row: {
                    id: number | null;
                    inserted_at: string | null;
                    updated_at: string | null;
                    title: string | null;
                    date: string | null;
                    description: string | null;
                    online: boolean | null;
                    mandatory: boolean | null;
                    type_id: number | null;
                    location: string | null;
                    sq_mandatory: boolean | null;
                };
                Insert: {
                    id?: number | null;
                    inserted_at?: string | null;
                    updated_at?: string | null;
                    title?: string | null;
                    date?: string | null;
                    description?: string | null;
                    online?: boolean | null;
                    mandatory?: boolean | null;
                    type_id?: number | null;
                    location?: string | null;
                    sq_mandatory?: boolean | null;
                };
                Update: {
                    id?: number | null;
                    inserted_at?: string | null;
                    updated_at?: string | null;
                    title?: string | null;
                    date?: string | null;
                    description?: string | null;
                    online?: boolean | null;
                    mandatory?: boolean | null;
                    type_id?: number | null;
                    location?: string | null;
                    sq_mandatory?: boolean | null;
                };
            };
            event_registrations: {
                Row: {
                    inserted_at: string;
                    user_id: string;
                    event_id: number;
                    present: boolean;
                };
                Insert: {
                    inserted_at?: string;
                    user_id: string;
                    event_id: number;
                    present?: boolean;
                };
                Update: {
                    inserted_at?: string;
                    user_id?: string;
                    event_id?: number;
                    present?: boolean;
                };
            };
            team_members: {
                Row: {
                    inserted_at: string;
                    user_id: string;
                    team_id: number;
                };
                Insert: {
                    inserted_at?: string;
                    user_id: string;
                    team_id: number;
                };
                Update: {
                    inserted_at?: string;
                    user_id?: string;
                    team_id?: number;
                };
            };
            teams: {
                Row: {
                    inserted_at: string;
                    id: number;
                    name: string;
                    description: string;
                    tags: Json;
                    logo: string | null;
                    archived: boolean;
                    requestSupport: Json;
                };
                Insert: {
                    inserted_at?: string;
                    id?: number;
                    name?: string;
                    description?: string;
                    tags?: Json;
                    logo?: string | null;
                    archived?: boolean;
                    requestSupport?: Json;
                };
                Update: {
                    inserted_at?: string;
                    id?: number;
                    name?: string;
                    description?: string;
                    tags?: Json;
                    logo?: string | null;
                    archived?: boolean;
                    requestSupport?: Json;
                };
            };
            mentor_assignment: {
                Row: {
                    created_at: string | null;
                    mentor: string;
                    team: number;
                };
                Insert: {
                    created_at?: string | null;
                    mentor: string;
                    team: number;
                };
                Update: {
                    created_at?: string | null;
                    mentor?: string;
                    team?: number;
                };
            };
            sponsors: {
                Row: {
                    id: number;
                    created_at: string | null;
                    name: string;
                    logo: string;
                    link: string;
                    type: Database['public']['Enums']['sponsor_type'];
                };
                Insert: {
                    id?: number;
                    created_at?: string | null;
                    name?: string;
                    logo?: string;
                    link?: string;
                    type: Database['public']['Enums']['sponsor_type'];
                };
                Update: {
                    id?: number;
                    created_at?: string | null;
                    name?: string;
                    logo?: string;
                    link?: string;
                    type?: Database['public']['Enums']['sponsor_type'];
                };
            };
            faqs: {
                Row: {
                    id: number;
                    created_at: string | null;
                    question: string | null;
                    answer: string | null;
                };
                Insert: {
                    id?: number;
                    created_at?: string | null;
                    question?: string | null;
                    answer?: string | null;
                };
                Update: {
                    id?: number;
                    created_at?: string | null;
                    question?: string | null;
                    answer?: string | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            isadmin: {
                Args: { user_id: string };
                Returns: boolean;
            };
            accept_request: {
                Args: { requesting_user_id: string };
                Returns: undefined;
            };
        };
        Enums: {
            gender: 'MALE' | 'FEMALE' | 'OTHER';
            enum_event_type: 'Online' | 'Offline' | 'Hybrid';
            user_role: 'PARTICIPANT' | 'BUDDY' | 'MENTOR' | 'EXPERT' | 'ORGA';
            sponsor_type: 'GOLD' | 'SILVER' | 'BRONZE' | 'FLAGSHIP';
            event_type: 'Online' | 'Offline' | 'Hybrid';
        };
    };
}
