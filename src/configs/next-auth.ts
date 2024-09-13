import type { AuthOptions, DefaultSession } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

import { environmentVariables } from '@/utils/environment-variables';

const SPOTIFY_AUTHORIZATION_OPTIONS = [
  'user-read-email',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
].join(',');

export const nextAuthOptions: AuthOptions = {
  secret: environmentVariables.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: environmentVariables.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: environmentVariables.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${SPOTIFY_AUTHORIZATION_OPTIONS}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user = {
          ...session.user,
          accessToken: token.accessToken,
        } as DefaultSession['user'];
      }

      return session;
    },
  },
};
