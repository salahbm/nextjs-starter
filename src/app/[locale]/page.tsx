import Link from 'next/link';
import React from 'react';

const Home = (): JSX.Element => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-rose-400">Next JS Template</h1>
      <h2 className="text-xl text-neutral-700">
        This is template is developed for Next JS Projects as a starting point
      </h2>

      {/* CHECK OUT THE README */}
      <Link
        href="https://gitlab.com/momenti/nextjs-boilerplate-by-salah/-/blob/main/README.md"
        target="_blank"
        className="font-body-1 text-gray-6 underline"
      >
        Check out the README
      </Link>

      {/* CHECK OUT THE MOMENTI-ESLINT */}
      <Link
        href="https://gitlab.com/momenti/momenti-eslint"
        target="_blank"
        className="font-body-2 text-gray-7 underline"
      >
        This Project uses Momenti ESLint
      </Link>
    </div>
  );
};

export default Home;
