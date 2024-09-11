import { getServerSession } from 'next-auth/next';
import type { FC } from 'react';

import { LogIn } from '@/components/log-in';
import { Page } from '@/components/page';
import { Shuffler } from '@/components/shuffler';
import { cn } from '@/utils/cn';

import { nextAuthOptions } from '../api/auth/[...nextauth]/route';

const HomePage: FC = async () => {
  const data = await getServerSession(nextAuthOptions);

  const isUserAvailable = data && data.user;

  return (
    <Page className={cn(isUserAvailable ? 'max-w-4xl' : null)}>
      {data && data.user ? <Shuffler data={data.user} /> : <LogIn />}
    </Page>
  );
};

export default HomePage;
