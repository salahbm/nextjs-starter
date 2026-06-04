'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

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

import { Link } from '@/i18n/routing';

// Standard Zod errors (email, min) are handled by the built-in locale.
// Custom validations use .refine() with customCode for the customError map.
const signUpSchema = z.object({
  username: required(z.string().min(3)),
  email: required(z.email()),
  password: required(
    z
      .string()
      .min(8)
      .refine(
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v,
          ),
        { params: { customCode: 'custom.password_strong' } },
      ),
  ),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpView() {
  const router = useRouter();
  const t = useTranslations('auth');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);

    try {
      // Here you would implement your registration logic
      console.info('Sign up data:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to success page after successful registration
      router.push('/success');
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="typo-header">{t('signUp.title')}</h1>
          <p className="typo-body-2 mt-2 text-muted-foreground">
            {t('signUp.subtitle')}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormFields
              name="username"
              label={t('signUp.usernameLabel')}
              required
              control={form.control}
              render={({ field }) => (
                <Input
                  placeholder={t('signUp.usernamePlaceholder')}
                  autoComplete="username"
                  disabled={isLoading}
                  {...field}
                />
              )}
            />

            <FormFields
              name="email"
              label={t('signUp.emailLabel')}
              required
              control={form.control}
              render={({ field }) => (
                <Input
                  placeholder={t('signUp.emailPlaceholder')}
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  {...field}
                />
              )}
            />

            <FormFields
              name="password"
              label={t('signUp.passwordLabel')}
              required
              message={t('signUp.passwordHint')}
              messageClassName="text-muted-foreground text-xs"
              control={form.control}
              render={({ field }) => (
                <PasswordInput
                  placeholder={t('signUp.passwordPlaceholder')}
                  autoComplete="new-password"
                  disabled={isLoading}
                  {...field}
                />
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('signUp.buttonLoading') : t('signUp.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="typo-caption-1 text-center">
              {t('signUp.haveAccount')}{' '}
              <Link href="/sign-in" className="text-primary hover:underline">
                {t('signUp.signInLink')}
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
