import React, { Suspense } from 'react';

import Header from '@/components/shared/header/header';
import Sidebar from '@/components/shared/sidebar/sidebar-trigger';
import Loader from '@/components/ui/loader';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="h-dvh w-full overflow-y-auto">{children}</div>
      </div>
    </Suspense>
  );
}
