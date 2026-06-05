import { JSX } from 'react';

const NotFound = (): JSX.Element => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
    </div>
  );
};

export default NotFound;
