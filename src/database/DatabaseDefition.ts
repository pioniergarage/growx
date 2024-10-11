
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_information: {
        Row: {
          email: string
          phone: string | null
          user_id: string
        }
        Insert: {
          email?: string
          phone?: string | null
          user_id: string
        }
        Update: {
          email?: string
          phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_information_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "contact_information_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "team_leads"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "contact_information_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "teams_with_members"
            referencedColumns: ["user_id"]
          },
        ]
      }
      event_backup19_08_2022: {
        Row: {
          date: string | null
          description: string | null
          id: number | null
          inserted_at: string | null
          location: string | null
          mandatory: boolean | null
          online: boolean | null
          sq_mandatory: boolean | null
          title: string | null
          type_id: number | null
          updated_at: string | null
        }
        Insert: {
          date?: string | null
          description?: string | null
          id?: number | null
          inserted_at?: string | null
          location?: string | null
          mandatory?: boolean | null
          online?: boolean | null
          sq_mandatory?: boolean | null
          title?: string | null
          type_id?: number | null
          updated_at?: string | null
        }
        Update: {
          date?: string | null
          description?: string | null
          id?: number | null
          inserted_at?: string | null
          location?: string | null
          mandatory?: boolean | null
          online?: boolean | null
          sq_mandatory?: boolean | null
          title?: string | null
          type_id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          event_id: number
          inserted_at: string
          present: boolean
          user_id: string
        }
        Insert: {
          event_id: number
          inserted_at?: string
          present?: boolean
          user_id: string
        }
        Update: {
          event_id?: number
          inserted_at?: string
          present?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event_with_seats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "team_leads"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "teams_with_members"
            referencedColumns: ["user_id"]
          },
        ]
      }
      events: {
        Row: {
          available_seats: number
          date: string
          description: string
          duration: number
          event_category: Database["public"]["Enums"]["event_category"] | null
          id: number
          inserted_at: string
          location: string
          mandatory: boolean
          ref: string | null
          title: string
          type: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at: string
        }
        Insert: {
          available_seats?: number
          date?: string
          description?: string
          duration?: number
          event_category?: Database["public"]["Enums"]["event_category"] | null
          id?: number
          inserted_at?: string
          location: string
          mandatory?: boolean
          ref?: string | null
          title?: string
          type?: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at?: string
        }
        Update: {
          available_seats?: number
          date?: string
          description?: string
          duration?: number
          event_category?: Database["public"]["Enums"]["event_category"] | null
          id?: number
          inserted_at?: string
          location?: string
          mandatory?: boolean
          ref?: string | null
          title?: string
          type?: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at?: string
        }
        Relationships: []
      }
      events_22: {
        Row: {
          available_seats: number
          date: string
          description: string
          duration: number
          id: number
          inserted_at: string
          location: string
          mandatory: boolean
          sq_mandatory: boolean
          title: string
          type: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at: string
        }
        Insert: {
          available_seats?: number
          date: string
          description?: string
          duration?: number
          id?: number
          inserted_at?: string
          location: string
          mandatory?: boolean
          sq_mandatory?: boolean
          title?: string
          type?: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at?: string
        }
        Update: {
          available_seats?: number
          date?: string
          description?: string
          duration?: number
          id?: number
          inserted_at?: string
          location?: string
          mandatory?: boolean
          sq_mandatory?: boolean
          title?: string
          type?: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at?: string
        }
        Relationships: []
      }
      events_23: {
        Row: {
          available_seats: number
          date: string
          description: string
          duration: number
          id: number
          inserted_at: string
          location: string
          mandatory: boolean
          sq_mandatory: boolean
          title: string
          type: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at: string
        }
        Insert: {
          available_seats?: number
          date?: string
          description?: string
          duration?: number
          id?: number
          inserted_at?: string
          location: string
          mandatory?: boolean
          sq_mandatory?: boolean
          title?: string
          type?: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at?: string
        }
        Update: {
          available_seats?: number
          date?: string
          description?: string
          duration?: number
          id?: number
          inserted_at?: string
          location?: string
          mandatory?: boolean
          sq_mandatory?: boolean
          title?: string
          type?: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string | null
          created_at: string | null
          id: number
          question: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string | null
          id?: number
          question?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string | null
          id?: number
          question?: string | null
        }
        Relationships: []
      }
      matriculation: {
        Row: {
          Id: string
          user_id: string
        }
        Insert: {
          Id: string
          user_id: string
        }
        Update: {
          Id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matriculation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matriculation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "team_leads"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matriculation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "teams_with_members"
            referencedColumns: ["user_id"]
          },
        ]
      }
      mats: {
        Row: {
          Id: string
          Nachname: string | null
          Vorname: string | null
        }
        Insert: {
          Id: string
          Nachname?: string | null
          Vorname?: string | null
        }
        Update: {
          Id?: string
          Nachname?: string | null
          Vorname?: string | null
        }
        Relationships: []
      }
      mentor_assignment: {
        Row: {
          created_at: string | null
          mentor: string
          team: number
        }
        Insert: {
          created_at?: string | null
          mentor: string
          team: number
        }
        Update: {
          created_at?: string | null
          mentor?: string
          team?: number
        }
        Relationships: [
          {
            foreignKeyName: "mentor_assignment_mentor_fkey"
            columns: ["mentor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "mentor_assignment_mentor_fkey"
            columns: ["mentor"]
            isOneToOne: false
            referencedRelation: "team_leads"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "mentor_assignment_mentor_fkey"
            columns: ["mentor"]
            isOneToOne: false
            referencedRelation: "teams_with_members"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "mentor_assignment_team_fkey"
            columns: ["team"]
            isOneToOne: true
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_assignment_team_fkey"
            columns: ["team"]
            isOneToOne: true
            referencedRelation: "teams_with_members"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          bio: string | null
          email: string | null
          first_name: string
          gender: Database["public"]["Enums"]["gender"] | null
          homeland: string | null
          inserted_at: string
          keyQualification: boolean
          last_name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          skills: Json
          studies: string | null
          university: string | null
          universityCountry: string | null
          user_id: string
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          email?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          homeland?: string | null
          inserted_at?: string
          keyQualification?: boolean
          last_name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: Json
          studies?: string | null
          university?: string | null
          universityCountry?: string | null
          user_id: string
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          email?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          homeland?: string | null
          inserted_at?: string
          keyQualification?: boolean
          last_name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: Json
          studies?: string | null
          university?: string | null
          universityCountry?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      signup_info: {
        Row: {
          created_at: string | null
          email: string
          expectations: string
          idea: string
          lookingForTeam: boolean
          source: string
        }
        Insert: {
          created_at?: string | null
          email?: string
          expectations?: string
          idea?: string
          lookingForTeam?: boolean
          source?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          expectations?: string
          idea?: string
          lookingForTeam?: boolean
          source?: string
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          created_at: string | null
          id: number
          link: string
          logo: string
          name: string
          type: Database["public"]["Enums"]["sponsor_type"]
        }
        Insert: {
          created_at?: string | null
          id?: number
          link?: string
          logo?: string
          name?: string
          type: Database["public"]["Enums"]["sponsor_type"]
        }
        Update: {
          created_at?: string | null
          id?: number
          link?: string
          logo?: string
          name?: string
          type?: Database["public"]["Enums"]["sponsor_type"]
        }
        Relationships: []
      }
      team_members: {
        Row: {
          inserted_at: string
          team_id: number
          user_id: string
        }
        Insert: {
          inserted_at?: string
          team_id: number
          user_id: string
        }
        Update: {
          inserted_at?: string
          team_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams_with_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "team_leads"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "teams_with_members"
            referencedColumns: ["user_id"]
          },
        ]
      }
      team_requests: {
        Row: {
          inserted_at: string
          team_id: number
          user_id: string
        }
        Insert: {
          inserted_at?: string
          team_id: number
          user_id: string
        }
        Update: {
          inserted_at?: string
          team_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_requests_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_requests_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams_with_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "team_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "team_leads"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "team_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "teams_with_members"
            referencedColumns: ["user_id"]
          },
        ]
      }
      teams: {
        Row: {
          archived: boolean
          description: string
          id: number
          inserted_at: string
          logo: string | null
          name: string
          requestSupport: Json
          tags: Json
        }
        Insert: {
          archived?: boolean
          description?: string
          id?: number
          inserted_at?: string
          logo?: string | null
          name?: string
          requestSupport?: Json
          tags?: Json
        }
        Update: {
          archived?: boolean
          description?: string
          id?: number
          inserted_at?: string
          logo?: string | null
          name?: string
          requestSupport?: Json
          tags?: Json
        }
        Relationships: []
      }
    }
    Views: {
      event_with_seats: {
        Row: {
          available_seats: number | null
          date: string | null
          description: string | null
          duration: number | null
          event_category: Database["public"]["Enums"]["event_category"] | null
          id: number | null
          inserted_at: string | null
          location: string | null
          mandatory: boolean | null
          ref: string | null
          seats_left: number | null
          title: string | null
          type: Database["public"]["Enums"]["enum_event_type"] | null
          updated_at: string | null
        }
        Relationships: []
      }
      team_leads: {
        Row: {
          team_id: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams_with_members"
            referencedColumns: ["id"]
          },
        ]
      }
      teams_with_members: {
        Row: {
          archived: boolean | null
          avatar: string | null
          first_name: string | null
          id: number | null
          last_name: string | null
          logo: string | null
          name: string | null
          requestSupport: Json | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_request: {
        Args: {
          requesting_user_id: string
        }
        Returns: undefined
      }
      get_assigned_team_leads: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      isadmin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      enum_event_type: "Online" | "Offline" | "Hybrid"
      event_category: "Grow" | "Workshop" | "Info"
      event_type: "Online" | "Offline" | "Hybrid"
      gender: "MALE" | "FEMALE" | "OTHER"
      sponsor_type: "GOLD" | "SILVER" | "BRONZE" | "FLAGSHIP"
      user_role: "PARTICIPANT" | "BUDDY" | "MENTOR" | "EXPERT" | "ORGA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
