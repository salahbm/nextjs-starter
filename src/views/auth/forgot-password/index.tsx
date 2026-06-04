'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FormFields } from '@/components/shared/form-fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function ForgotPasswordView() {
  const t = useTranslations('auth');
  const [isLoading, setIsLoading] = useState(false);

  // Form validation schema with translations
  const forgotPasswordSchema = z.object({
    email: z.email(t('validation.email.invalid')),
  });

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
      // Here you would implement your password reset logic
      console.info('Forgot password data:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to success page after successful submission
      // router.push('/success');
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="typo-header">{t('forgotPassword.title')}</h1>
          <p className="typo-body-2 mt-2 text-muted-foreground">
            {t('forgotPassword.subtitle')}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormFields
              name="email"
              label={t('forgotPassword.emailLabel')}
              required
              control={form.control}
              render={({ field }) => (
                <Input
                  placeholder={t('forgotPassword.emailPlaceholder')}
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  {...field}
                />
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? t('forgotPassword.buttonLoading')
                : t('forgotPassword.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-center">
              <Link
                href="/sign-in"
                className="typo-body-2 inline-flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('forgotPassword.backToSignIn')}
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
