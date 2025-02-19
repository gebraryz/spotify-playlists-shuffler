import type { AuthOptions, DefaultSession } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

import { environmentVariables } from '@/utils/environment-variables';

import { request } from './request';

const SPOTIFY_AUTHORIZATION_OPTIONS = [
  'user-read-email',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
].join(',');

export const nextAuthOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: environmentVariables.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: environmentVariables.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${SPOTIFY_AUTHORIZATION_OPTIONS}`,
    }),
  ],
  secret: environmentVariables.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        const user = await request('spotify')
          .get('me', {
            headers: { Authorization: `Bearer ${token.accessToken}` },
          })
          .json<SpotifyApi.UserProfileResponse>();

        session.user = {
          ...session.user,
          image:
            user && user.images && user.images[1]
              ? user.images[1].url
              : session.user,
          accessToken: token.accessToken,
        } as DefaultSession['user'];
      }

      return session;
    },
  },
};
