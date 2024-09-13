import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const environmentVariables = createEnv({
  server: {
    NEXTAUTH_SECRET: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  },
});
