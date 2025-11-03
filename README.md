<!-- [![Node.js CI](https://github.com/pioniergarage/growx/actions/workflows/build.yml/badge.svg)](https://github.com/pioniergarage/growx/actions/workflows/build.yml) -->

# Website for the Grow Competition

<!-- TODO: Add some quick info about grow (Links to Notion and who is responsible) -->

## Getting Started

### Installation

First install the dependencies:

```
npm install
```

### Supabase configuration

1. Then, duplicate the file `.env.local.sample` and rename it to `.env.local`
2. Go to [https://app.supabase.com/project/gzffqettxggcszrafysw/settings/api](https://app.supabase.com/project/gzffqettxggcszrafysw/settings/api), copy the project's anon key and paste it into the file `.env.local`

---

### Running the development server

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Deps

-   [Next.js](https://nextjs.org/)
-   [Tailwind](https://tailwindcss.com/)
-   [Daisy UI](https://daisyui.com/)
-   [Supabase](https://supabase.com/): [Supabase JS](https://github.com/supabase/supabase-js) + [Supabase Auth Helpers](https://github.com/supabase-community/auth-helpers)
