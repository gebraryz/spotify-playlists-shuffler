import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

import { environmentVariables } from '@/utils/environment-variables';

export const nextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: environmentVariables.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: environmentVariables.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    }),
  ],
};

export const nextAuthHandler = NextAuth(nextAuthOptions);
