/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/events": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.events.id"];
          inserted_at?: parameters["rowFilter.events.inserted_at"];
          updated_at?: parameters["rowFilter.events.updated_at"];
          title?: parameters["rowFilter.events.title"];
          date?: parameters["rowFilter.events.date"];
          description?: parameters["rowFilter.events.description"];
          /** old, löschen! */
          online?: parameters["rowFilter.events.online"];
          mandatory?: parameters["rowFilter.events.mandatory"];
          /** the type of the event. The number must match to the eventtypes type. 1 = Online; 2 = Offline, 3 = Hybrid */
          type_id?: parameters["rowFilter.events.type_id"];
          /** The location of the Event */
          location?: parameters["rowFilter.events.location"];
          /** Obligatory for participants who want to have the Schlüsselqualifikation points */
          sq_mandatory?: parameters["rowFilter.events.sq_mandatory"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["events"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** events */
          events?: definitions["events"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.events.id"];
          inserted_at?: parameters["rowFilter.events.inserted_at"];
          updated_at?: parameters["rowFilter.events.updated_at"];
          title?: parameters["rowFilter.events.title"];
          date?: parameters["rowFilter.events.date"];
          description?: parameters["rowFilter.events.description"];
          /** old, löschen! */
          online?: parameters["rowFilter.events.online"];
          mandatory?: parameters["rowFilter.events.mandatory"];
          /** the type of the event. The number must match to the eventtypes type. 1 = Online; 2 = Offline, 3 = Hybrid */
          type_id?: parameters["rowFilter.events.type_id"];
          /** The location of the Event */
          location?: parameters["rowFilter.events.location"];
          /** Obligatory for participants who want to have the Schlüsselqualifikation points */
          sq_mandatory?: parameters["rowFilter.events.sq_mandatory"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.events.id"];
          inserted_at?: parameters["rowFilter.events.inserted_at"];
          updated_at?: parameters["rowFilter.events.updated_at"];
          title?: parameters["rowFilter.events.title"];
          date?: parameters["rowFilter.events.date"];
          description?: parameters["rowFilter.events.description"];
          /** old, löschen! */
          online?: parameters["rowFilter.events.online"];
          mandatory?: parameters["rowFilter.events.mandatory"];
          /** the type of the event. The number must match to the eventtypes type. 1 = Online; 2 = Offline, 3 = Hybrid */
          type_id?: parameters["rowFilter.events.type_id"];
          /** The location of the Event */
          location?: parameters["rowFilter.events.location"];
          /** Obligatory for participants who want to have the Schlüsselqualifikation points */
          sq_mandatory?: parameters["rowFilter.events.sq_mandatory"];
        };
        body: {
          /** events */
          events?: definitions["events"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/faqs": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.faqs.id"];
          created_at?: parameters["rowFilter.faqs.created_at"];
          question?: parameters["rowFilter.faqs.question"];
          answer?: parameters["rowFilter.faqs.answer"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["faqs"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** faqs */
          faqs?: definitions["faqs"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.faqs.id"];
          created_at?: parameters["rowFilter.faqs.created_at"];
          question?: parameters["rowFilter.faqs.question"];
          answer?: parameters["rowFilter.faqs.answer"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.faqs.id"];
          created_at?: parameters["rowFilter.faqs.created_at"];
          question?: parameters["rowFilter.faqs.question"];
          answer?: parameters["rowFilter.faqs.answer"];
        };
        body: {
          /** faqs */
          faqs?: definitions["faqs"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/registrations": {
    get: {
      parameters: {
        query: {
          inserted_at?: parameters["rowFilter.registrations.inserted_at"];
          user_id?: parameters["rowFilter.registrations.user_id"];
          event_id?: parameters["rowFilter.registrations.event_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["registrations"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** registrations */
          registrations?: definitions["registrations"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          inserted_at?: parameters["rowFilter.registrations.inserted_at"];
          user_id?: parameters["rowFilter.registrations.user_id"];
          event_id?: parameters["rowFilter.registrations.event_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          inserted_at?: parameters["rowFilter.registrations.inserted_at"];
          user_id?: parameters["rowFilter.registrations.user_id"];
          event_id?: parameters["rowFilter.registrations.event_id"];
        };
        body: {
          /** registrations */
          registrations?: definitions["registrations"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          user_id?: parameters["rowFilter.profiles.user_id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          first_name?: parameters["rowFilter.profiles.first_name"];
          last_name?: parameters["rowFilter.profiles.last_name"];
          email?: parameters["rowFilter.profiles.email"];
          gender?: parameters["rowFilter.profiles.gender"];
          phone?: parameters["rowFilter.profiles.phone"];
          studies?: parameters["rowFilter.profiles.studies"];
          university?: parameters["rowFilter.profiles.university"];
          homeland?: parameters["rowFilter.profiles.homeland"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          user_id?: parameters["rowFilter.profiles.user_id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          first_name?: parameters["rowFilter.profiles.first_name"];
          last_name?: parameters["rowFilter.profiles.last_name"];
          email?: parameters["rowFilter.profiles.email"];
          gender?: parameters["rowFilter.profiles.gender"];
          phone?: parameters["rowFilter.profiles.phone"];
          studies?: parameters["rowFilter.profiles.studies"];
          university?: parameters["rowFilter.profiles.university"];
          homeland?: parameters["rowFilter.profiles.homeland"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          user_id?: parameters["rowFilter.profiles.user_id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          first_name?: parameters["rowFilter.profiles.first_name"];
          last_name?: parameters["rowFilter.profiles.last_name"];
          email?: parameters["rowFilter.profiles.email"];
          gender?: parameters["rowFilter.profiles.gender"];
          phone?: parameters["rowFilter.profiles.phone"];
          studies?: parameters["rowFilter.profiles.studies"];
          university?: parameters["rowFilter.profiles.university"];
          homeland?: parameters["rowFilter.profiles.homeland"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/sponsors": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.sponsors.id"];
          created_at?: parameters["rowFilter.sponsors.created_at"];
          name?: parameters["rowFilter.sponsors.name"];
          logo?: parameters["rowFilter.sponsors.logo"];
          link?: parameters["rowFilter.sponsors.link"];
          type?: parameters["rowFilter.sponsors.type"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["sponsors"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** sponsors */
          sponsors?: definitions["sponsors"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.sponsors.id"];
          created_at?: parameters["rowFilter.sponsors.created_at"];
          name?: parameters["rowFilter.sponsors.name"];
          logo?: parameters["rowFilter.sponsors.logo"];
          link?: parameters["rowFilter.sponsors.link"];
          type?: parameters["rowFilter.sponsors.type"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.sponsors.id"];
          created_at?: parameters["rowFilter.sponsors.created_at"];
          name?: parameters["rowFilter.sponsors.name"];
          logo?: parameters["rowFilter.sponsors.logo"];
          link?: parameters["rowFilter.sponsors.link"];
          type?: parameters["rowFilter.sponsors.type"];
        };
        body: {
          /** sponsors */
          sponsors?: definitions["sponsors"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/user_roles": {
    get: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.user_roles.created_at"];
          role?: parameters["rowFilter.user_roles.role"];
          user_id?: parameters["rowFilter.user_roles.user_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["user_roles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** user_roles */
          user_roles?: definitions["user_roles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.user_roles.created_at"];
          role?: parameters["rowFilter.user_roles.role"];
          user_id?: parameters["rowFilter.user_roles.user_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.user_roles.created_at"];
          role?: parameters["rowFilter.user_roles.role"];
          user_id?: parameters["rowFilter.user_roles.user_id"];
        };
        body: {
          /** user_roles */
          user_roles?: definitions["user_roles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/event_types": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.event_types.id"];
          type?: parameters["rowFilter.event_types.type"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["event_types"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** event_types */
          event_types?: definitions["event_types"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.event_types.id"];
          type?: parameters["rowFilter.event_types.type"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.event_types.id"];
          type?: parameters["rowFilter.event_types.type"];
        };
        body: {
          /** event_types */
          event_types?: definitions["event_types"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/isadmin": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: uuid */
            user_id: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  events: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default timezone('utc'::text, now())
     */
    inserted_at: string;
    /**
     * Format: timestamp with time zone
     * @default timezone('utc'::text, now())
     */
    updated_at: string;
    /**
     * Format: text
     * @default
     */
    title: string;
    /**
     * Format: timestamp without time zone
     * @default now()
     */
    date: string;
    /**
     * Format: text
     * @default
     */
    description: string;
    /**
     * Format: boolean
     * @description old, löschen!
     * @default false
     */
    online: boolean;
    /**
     * Format: boolean
     * @default false
     */
    mandatory: boolean;
    /**
     * Format: bigint
     * @description the type of the event. The number must match to the eventtypes type. 1 = Online; 2 = Offline, 3 = Hybrid
     *
     * Note:
     * This is a Foreign Key to `event_types.id`.<fk table='event_types' column='id'/>
     */
    type_id: number;
    /**
     * Format: text
     * @description The location of the Event
     */
    location: string;
    /**
     * Format: boolean
     * @description Obligatory for participants who want to have the Schlüsselqualifikation points
     * @default false
     */
    sq_mandatory: boolean;
  };
  faqs: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: text
     * @default
     */
    question?: string;
    /**
     * Format: text
     * @default
     */
    answer?: string;
  };
  registrations: {
    /**
     * Format: timestamp with time zone
     * @default timezone('utc'::text, now())
     */
    inserted_at: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `profiles.user_id`.<fk table='profiles' column='user_id'/>
     */
    user_id: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `events.id`.<fk table='events' column='id'/>
     */
    event_id: number;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    user_id: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /**
     * Format: text
     * @default
     */
    first_name: string;
    /**
     * Format: text
     * @default
     */
    last_name: string;
    /**
     * Format: text
     * @default
     */
    email: string;
    /**
     * Format: text
     * @default
     */
    gender: string;
    /**
     * Format: text
     * @default
     */
    phone: string;
    /**
     * Format: text
     * @default
     */
    studies: string;
    /**
     * Format: text
     * @default
     */
    university: string;
    /**
     * Format: text
     * @default
     */
    homeland: string;
  };
  sponsors: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: text
     * @default
     */
    name: string;
    /**
     * Format: text
     * @default
     */
    logo: string;
    /**
     * Format: text
     * @default
     */
    link: string;
    /** Format: smallint */
    type: number;
  };
  user_roles: {
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /**
     * Format: text
     * @default participant
     */
    role?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `profiles.user_id`.<fk table='profiles' column='user_id'/>
     */
    user_id: string;
  };
  /** @description A Table for the Eventtypes */
  event_types: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: text */
    type: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description events */
  "body.events": definitions["events"];
  /** Format: bigint */
  "rowFilter.events.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.events.inserted_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.events.updated_at": string;
  /** Format: text */
  "rowFilter.events.title": string;
  /** Format: timestamp without time zone */
  "rowFilter.events.date": string;
  /** Format: text */
  "rowFilter.events.description": string;
  /**
   * Format: boolean
   * @description old, löschen!
   */
  "rowFilter.events.online": string;
  /** Format: boolean */
  "rowFilter.events.mandatory": string;
  /**
   * Format: bigint
   * @description the type of the event. The number must match to the eventtypes type. 1 = Online; 2 = Offline, 3 = Hybrid
   */
  "rowFilter.events.type_id": string;
  /**
   * Format: text
   * @description The location of the Event
   */
  "rowFilter.events.location": string;
  /**
   * Format: boolean
   * @description Obligatory for participants who want to have the Schlüsselqualifikation points
   */
  "rowFilter.events.sq_mandatory": string;
  /** @description faqs */
  "body.faqs": definitions["faqs"];
  /** Format: bigint */
  "rowFilter.faqs.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.faqs.created_at": string;
  /** Format: text */
  "rowFilter.faqs.question": string;
  /** Format: text */
  "rowFilter.faqs.answer": string;
  /** @description registrations */
  "body.registrations": definitions["registrations"];
  /** Format: timestamp with time zone */
  "rowFilter.registrations.inserted_at": string;
  /** Format: uuid */
  "rowFilter.registrations.user_id": string;
  /** Format: bigint */
  "rowFilter.registrations.event_id": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.user_id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles.updated_at": string;
  /** Format: text */
  "rowFilter.profiles.first_name": string;
  /** Format: text */
  "rowFilter.profiles.last_name": string;
  /** Format: text */
  "rowFilter.profiles.email": string;
  /** Format: text */
  "rowFilter.profiles.gender": string;
  /** Format: text */
  "rowFilter.profiles.phone": string;
  /** Format: text */
  "rowFilter.profiles.studies": string;
  /** Format: text */
  "rowFilter.profiles.university": string;
  /** Format: text */
  "rowFilter.profiles.homeland": string;
  /** @description sponsors */
  "body.sponsors": definitions["sponsors"];
  /** Format: bigint */
  "rowFilter.sponsors.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.sponsors.created_at": string;
  /** Format: text */
  "rowFilter.sponsors.name": string;
  /** Format: text */
  "rowFilter.sponsors.logo": string;
  /** Format: text */
  "rowFilter.sponsors.link": string;
  /** Format: smallint */
  "rowFilter.sponsors.type": string;
  /** @description user_roles */
  "body.user_roles": definitions["user_roles"];
  /** Format: timestamp with time zone */
  "rowFilter.user_roles.created_at": string;
  /** Format: text */
  "rowFilter.user_roles.role": string;
  /** Format: uuid */
  "rowFilter.user_roles.user_id": string;
  /** @description event_types */
  "body.event_types": definitions["event_types"];
  /** Format: bigint */
  "rowFilter.event_types.id": string;
  /** Format: text */
  "rowFilter.event_types.type": string;
}

export interface operations {}

export interface external {}