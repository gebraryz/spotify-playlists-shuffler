'use client';

import Error from 'next/error';
import type { FC } from 'react';

const GlobalNotFoundPage: FC = () => (
  <html lang="en">
    <body>
      <Error statusCode={404} />
    </body>
  </html>
);

export default GlobalNotFoundPage;
