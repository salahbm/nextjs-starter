'use client';

import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container pb-10">
      <h1 className="mb-6 text-3xl font-bold">Preferences</h1>

      <div className="grid gap-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Theme</h2>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button
              onClick={() => setTheme('light')}
              variant={theme === 'light' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>

            <Button
              onClick={() => setTheme('dark')}
              variant={theme === 'dark' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>

            <Button
              onClick={() => setTheme('system')}
              variant={theme === 'system' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Laptop className="h-4 w-4" />
              System
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
