'use client';

import { useState } from 'react';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FormFields } from '@/components/shared/form-fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';

import { required } from '@/utils/zod-locale';

import { COOKIE_KEYS } from '@/constants/cookies';
import { routes } from '@/constants/routes';

import { Link, useRouter } from '@/i18n/routing';
import { AuthHeader } from '@/views/auth/header';

// Standard Zod errors (email, min) are handled by the built-in locale.
// Custom validations use .refine() with customCode for the customError map.
const signInSchema = z.object({
  email: required(z.email()),
  password: required(z.string().min(6)),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInView() {
  const router = useRouter();
  const t = useTranslations('auth');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);

    try {
      // Here you would implement your authentication logic
      console.info('Sign in data:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set access token in cookie
      document.cookie = `${COOKIE_KEYS.ACCESS_TOKEN}=${data.email}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 7,
      ).toUTCString()}`;

      // Redirect to dashboard or home page after successful login
      router.push(routes.home);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-dvh flex-row items-stretch">
      <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center p-4">
        <AuthHeader />
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="typo-header">{t('signIn.title')}</h1>
            <p className="typo-body-2 mt-2 text-muted-foreground">
              {t('signIn.subtitle')}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormFields
                name="email"
                label={t('signIn.emailLabel')}
                required
                control={form.control}
                render={({ field }) => (
                  <Input
                    placeholder={t('signIn.emailPlaceholder')}
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                )}
              />

              <FormFields
                name="password"
                label={t('signIn.passwordLabel')}
                required
                control={form.control}
                render={({ field }) => (
                  <PasswordInput
                    placeholder={t('signIn.passwordPlaceholder')}
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                )}
              />

              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="typo-body-2 text-primary hover:underline"
                >
                  {t('signIn.forgotPassword')}
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('signIn.buttonLoading') : t('signIn.button')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="typo-caption-1 text-center">
                {t('signIn.noAccount')}{' '}
                <Link
                  href="/sign-up"
                  className="text-primary underline underline-offset-2 hover:font-semibold"
                >
                  {t('signIn.signUpLink')}
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <aside className="relative hidden min-h-0 flex-1 overflow-hidden lg:block">
        <Image
          src="/images/login-background.webp"
          alt="Auth background"
          fill
          sizes="50vw"
          priority
          className="object-cover"
        />
      </aside>
    </div>
  );
}
