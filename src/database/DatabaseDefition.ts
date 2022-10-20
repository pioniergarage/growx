export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_information: {
        Row: {
          user_id: string
          phone: string | null
          email: string
        }
        Insert: {
          user_id: string
          phone?: string | null
          email?: string
        }
        Update: {
          user_id?: string
          phone?: string | null
          email?: string
        }
      }
      event_backup19_08_2022: {
        Row: {
          id: number | null
          inserted_at: string | null
          updated_at: string | null
          title: string | null
          date: string | null
          description: string | null
          online: boolean | null
          mandatory: boolean | null
          type_id: number | null
          location: string | null
          sq_mandatory: boolean | null
        }
        Insert: {
          id?: number | null
          inserted_at?: string | null
          updated_at?: string | null
          title?: string | null
          date?: string | null
          description?: string | null
          online?: boolean | null
          mandatory?: boolean | null
          type_id?: number | null
          location?: string | null
          sq_mandatory?: boolean | null
        }
        Update: {
          id?: number | null
          inserted_at?: string | null
          updated_at?: string | null
          title?: string | null
          date?: string | null
          description?: string | null
          online?: boolean | null
          mandatory?: boolean | null
          type_id?: number | null
          location?: string | null
          sq_mandatory?: boolean | null
        }
      }
      event_registrations: {
        Row: {
          user_id: string
          event_id: number
          inserted_at: string
          present: boolean
        }
        Insert: {
          user_id: string
          event_id: number
          inserted_at?: string
          present?: boolean
        }
        Update: {
          user_id?: string
          event_id?: number
          inserted_at?: string
          present?: boolean
        }
      }
      events: {
        Row: {
          location: string
          type: Database["public"]["Enums"]["enum_event_type"] | null
          inserted_at: string
          updated_at: string
          title: string
          date: string
          description: string
          mandatory: boolean
          sq_mandatory: boolean
          id: number
        }
        Insert: {
          location: string
          type?: Database["public"]["Enums"]["enum_event_type"] | null
          inserted_at?: string
          updated_at?: string
          title?: string
          date?: string
          description?: string
          mandatory?: boolean
          sq_mandatory?: boolean
          id?: number
        }
        Update: {
          location?: string
          type?: Database["public"]["Enums"]["enum_event_type"] | null
          inserted_at?: string
          updated_at?: string
          title?: string
          date?: string
          description?: string
          mandatory?: boolean
          sq_mandatory?: boolean
          id?: number
        }
      }
      faqs: {
        Row: {
          created_at: string | null
          question: string | null
          answer: string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          question?: string | null
          answer?: string | null
          id?: number
        }
        Update: {
          created_at?: string | null
          question?: string | null
          answer?: string | null
          id?: number
        }
      }
      mentor_assignment: {
        Row: {
          mentor: string
          team: number
          created_at: string | null
        }
        Insert: {
          mentor: string
          team: number
          created_at?: string | null
        }
        Update: {
          mentor?: string
          team?: number
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          user_id: string
          phone: string | null
          studies: string | null
          university: string | null
          homeland: string | null
          avatar: string | null
          bio: string | null
          inserted_at: string
          first_name: string
          last_name: string
          email: string
          gender: Database["public"]["Enums"]["gender"] | null
          role: Database["public"]["Enums"]["user_role"]
          skills: Json
          keyQualification: boolean
          universityCountry: string | null
        }
        Insert: {
          user_id: string
          phone?: string | null
          studies?: string | null
          university?: string | null
          homeland?: string | null
          avatar?: string | null
          bio?: string | null
          inserted_at?: string
          first_name?: string
          last_name?: string
          email?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: Json
          keyQualification?: boolean
          universityCountry?: string | null
        }
        Update: {
          user_id?: string
          phone?: string | null
          studies?: string | null
          university?: string | null
          homeland?: string | null
          avatar?: string | null
          bio?: string | null
          inserted_at?: string
          first_name?: string
          last_name?: string
          email?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: Json
          keyQualification?: boolean
          universityCountry?: string | null
        }
      }
      signup_info: {
        Row: {
          created_at: string | null
          lookingForTeam: boolean
          idea: string
          expectations: string
          source: string
          email: string
        }
        Insert: {
          created_at?: string | null
          lookingForTeam?: boolean
          idea?: string
          expectations?: string
          source?: string
          email?: string
        }
        Update: {
          created_at?: string | null
          lookingForTeam?: boolean
          idea?: string
          expectations?: string
          source?: string
          email?: string
        }
      }
      sponsors: {
        Row: {
          type: Database["public"]["Enums"]["sponsor_type"]
          created_at: string | null
          name: string
          logo: string
          link: string
          id: number
        }
        Insert: {
          type: Database["public"]["Enums"]["sponsor_type"]
          created_at?: string | null
          name?: string
          logo?: string
          link?: string
          id?: number
        }
        Update: {
          type?: Database["public"]["Enums"]["sponsor_type"]
          created_at?: string | null
          name?: string
          logo?: string
          link?: string
          id?: number
        }
      }
      team_members: {
        Row: {
          user_id: string
          team_id: number
          inserted_at: string
        }
        Insert: {
          user_id: string
          team_id: number
          inserted_at?: string
        }
        Update: {
          user_id?: string
          team_id?: number
          inserted_at?: string
        }
      }
      team_requests: {
        Row: {
          user_id: string
          team_id: number
          inserted_at: string
        }
        Insert: {
          user_id: string
          team_id: number
          inserted_at?: string
        }
        Update: {
          user_id?: string
          team_id?: number
          inserted_at?: string
        }
      }
      teams: {
        Row: {
          inserted_at: string
          name: string
          description: string
          tags: Json
          logo: string | null
          archived: boolean
          requestSupport: Json
          id: number
        }
        Insert: {
          inserted_at?: string
          name?: string
          description?: string
          tags?: Json
          logo?: string | null
          archived?: boolean
          requestSupport?: Json
          id?: number
        }
        Update: {
          inserted_at?: string
          name?: string
          description?: string
          tags?: Json
          logo?: string | null
          archived?: boolean
          requestSupport?: Json
          id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_request: {
        Args: { requesting_user_id: string }
        Returns: undefined
      }
      isadmin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      enum_event_type: "Online" | "Offline" | "Hybrid"
      event_type: "Online" | "Offline" | "Hybrid"
      gender: "MALE" | "FEMALE" | "OTHER"
      sponsor_type: "GOLD" | "SILVER" | "BRONZE" | "FLAGSHIP"
      user_role: "PARTICIPANT" | "BUDDY" | "MENTOR" | "EXPERT" | "ORGA"
    }
  }
}

