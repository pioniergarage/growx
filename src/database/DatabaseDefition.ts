export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.1 (8cbcf98)"
  }
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
            foreignKeyName: "contact_information_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "contact_information_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "team_leads"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "contact_information_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "teams_with_members"
            referencedColumns: ["user_id"]
          },
        ]
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
          href: string | null
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
          href?: string | null
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
          href?: string | null
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
        Relationships: []
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
        Relationships: []
      }
    }
    Functions: {
      accept_request: {
        Args: { requesting_user_id: string }
        Returns: undefined
      }
      delete_own_user: { Args: never; Returns: undefined }
      get_assigned_team_leads: {
        Args: never
        Returns: Record<string, unknown>[]
      }
      isadmin: { Args: { user_id: string }; Returns: boolean }
      register_user_to_event: {
        Args: { event_id: number; present: boolean; user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      enum_event_type: "Online" | "Offline" | "Hybrid"
      event_category: "Grow" | "Workshop" | "Info"
      event_type: "Online" | "Offline" | "Hybrid"
      gender: "MALE" | "FEMALE" | "OTHER"
      sponsor_type:
        | "GOLD"
        | "SILVER"
        | "BRONZE"
        | "FLAGSHIP"
        | "SUPPORTER"
        | "PATRON"
      user_role: "PARTICIPANT" | "BUDDY" | "MENTOR" | "EXPERT" | "ORGA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      enum_event_type: ["Online", "Offline", "Hybrid"],
      event_category: ["Grow", "Workshop", "Info"],
      event_type: ["Online", "Offline", "Hybrid"],
      gender: ["MALE", "FEMALE", "OTHER"],
      sponsor_type: [
        "GOLD",
        "SILVER",
        "BRONZE",
        "FLAGSHIP",
        "SUPPORTER",
        "PATRON",
      ],
      user_role: ["PARTICIPANT", "BUDDY", "MENTOR", "EXPERT", "ORGA"],
    },
  },
} as const
