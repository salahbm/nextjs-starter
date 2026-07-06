import { JSX } from 'react';

import { getTranslations } from 'next-intl/server';

const NotFound = async (): Promise<JSX.Element> => {
  const t = await getTranslations('Error');

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <h1 className="text-3xl font-bold">{t('notFoundTitle')}</h1>
    </div>
  );
};

export default NotFound;
