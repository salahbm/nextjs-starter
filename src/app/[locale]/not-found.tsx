import { JSX } from 'react';

import { getTranslations } from 'next-intl/server';

import { NotFoundView } from '@/views/error';

const NotFound = async (): Promise<JSX.Element> => {
  const t = await getTranslations('Error');

  return (
    <NotFoundView
      title={t('notFoundTitle')}
      description={t('notFoundDescription')}
      actionLabel={t('goHome')}
    />
  );
};

export default NotFound;
