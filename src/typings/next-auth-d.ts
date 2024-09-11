// @types\next-auth.d.ts

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  type Session = {
    user: { accessToken: string } & DefaultSession['user'];
  };
}
