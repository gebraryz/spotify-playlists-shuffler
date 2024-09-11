import type { FC } from 'react';

import { TopBarThemeSwitcher } from './theme-switcher';

export const TopBar: FC = () => (
  <header className="fixed right-4 top-4">
    <TopBarThemeSwitcher />
  </header>
);
