'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DatePicker } from '@/components/shared/date-pickers';
import { FormFields } from '@/components/shared/form-fields';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Combobox } from '@/components/ui/combobox';
import { Form } from '@/components/ui/form';
import { Input, PasswordInput, TelephoneInput } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Uploader } from '@/components/ui/uploader';

import { required } from '@/utils/zod-locale';

import { FileMetadataSchema } from '@/hooks/common/use-file-upload';

const schema = z.object({
  // Basic Information
  username: required(z.string()),
  email: required(z.email()),
  password: z.string().min(6),
  description: z.string().optional(),
  telephone: z.string().optional(),

  // Preferences
  gender: z.string().optional(),
  photo: z.array(FileMetadataSchema).optional(),
  files: z.array(FileMetadataSchema).optional(),
  interests: z.array(z.string()).optional(),

  // Date Pickers
  birthday: z.date().optional(),
  customFormatDate: z.date().optional(),
  minMaxDate: z.date().optional(),
  birthDate: z.date().optional(),
  appointmentDate: z.date().optional(),
  interval: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),

  // Advanced Form Components
  subscriptionPlan: z.string().optional(),
  emailNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
});

export default function FormsPage() {
  const t = useTranslations();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      // Basic Information
      username: '',
      email: '',
      password: '',
      description: '',
      telephone: '',

      // Preferences
      gender: '',
      photo: [],
      files: [],
      interests: [],

      // Date Pickers
      birthday: undefined,
      customFormatDate: undefined,
      minMaxDate: undefined,
      birthDate: undefined,
      appointmentDate: undefined,
      interval: {
        from: undefined,
        to: undefined,
      },

      // Advanced Form Components
      subscriptionPlan: 'free',
      emailNotifications: false,
      smsNotifications: false,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.info(data);
  };

  return (
    <div className="container mx-auto pb-8">
      <h1 className="mb-6 text-3xl font-bold">Forms Demo</h1>

      <h2 className="text-xl font-semibold text-primary">
        {t('Metadata.title')}
      </h2>
      <p className="mb-8 text-muted-foreground">{t('Metadata.description')}</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (data) => {
            console.info(data);
          })}
          className="space-y-8"
        >
          {/* Basic Information Section */}
          <div className="card p-6">
            <h2 className="mb-6 text-xl font-semibold">Basic Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FormFields
                name="username"
                label="Username"
                required
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="Enter username" {...field} />
                )}
              />
              <FormFields
                name="email"
                label="Email"
                required
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="Enter email" type="email" {...field} />
                )}
              />
              <FormFields
                name="password"
                label="Password"
                control={form.control}
                render={({ field }) => (
                  <PasswordInput placeholder="Enter password" {...field} />
                )}
              />
              <FormFields
                name="telephone"
                label="Telephone"
                control={form.control}
                render={({ field }) => (
                  <TelephoneInput placeholder="Enter telephone" {...field} />
                )}
              />
            </div>
            <div className="mt-4">
              <FormFields
                name="description"
                label="Description"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    placeholder="Enter description"
                    className="min-h-[120px]"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          {/* Preferences Section */}
          <div className="card-md p-6">
            <h2 className="mb-6 text-xl font-semibold">Preferences</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FormFields
                name="gender"
                label="Gender"
                control={form.control}
                render={({ field }) => (
                  <Combobox
                    placeholder="Select gender"
                    searchable
                    options={[
                      { value: '1', label: 'Male' },
                      { value: '2', label: 'Female' },
                      { value: '3', label: 'Non-binary' },
                      { value: '4', label: 'Prefer not to say' },
                    ]}
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
              <FormFields
                name="birthday"
                label="Birthday"
                control={form.control}
                render={({ field }) => <DatePicker {...field} />}
              />
            </div>
            <div className="mt-4">
              <FormFields
                name="interests"
                label="Interests"
                control={form.control}
                render={({ field }) => (
                  <Combobox
                    placeholder="Select interests"
                    searchable
                    multiple
                    options={[
                      { value: 'react', label: 'React' },
                      { value: 'vue', label: 'Vue' },
                      { value: 'angular', label: 'Angular' },
                      { value: 'svelte', label: 'Svelte' },
                      { value: 'nextjs', label: 'Next.js' },
                      { value: 'nuxtjs', label: 'Nuxt.js' },
                      { value: 'gatsby', label: 'Gatsby' },
                      { value: 'typescript', label: 'TypeScript' },
                      { value: 'javascript', label: 'JavaScript' },
                      { value: 'python', label: 'Python' },
                      { value: 'java', label: 'Java' },
                    ]}
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                )}
                message="Select technologies you're interested in"
                messageClassName="text-muted-foreground text-xs"
              />
            </div>
            <div className="mt-4">
              <FormFields
                name="photo"
                label="Profile Photo"
                control={form.control}
                render={({ field }) => <Uploader {...field} maxFiles={1} />}
                message="Upload a profile photo (max 2MB)"
                messageClassName="text-muted-foreground text-xs"
              />
            </div>
            <div className="mt-4">
              <FormFields
                name="files"
                label="Files"
                control={form.control}
                render={({ field }) => <Uploader {...field} maxFiles={5} />}
                message="Upload up to 5 files (max 2MB each)"
                messageClassName="text-muted-foreground text-xs"
              />
            </div>
          </div>

          {/* Date Picker Examples */}
          <div className="card-lg p-6">
            <h2 className="mb-6 text-xl font-semibold">Date Picker Examples</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Basic Examples</h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">Basic DatePicker</p>
                    <FormFields
                      name="birthday"
                      control={form.control}
                      render={({ field }) => <DatePicker {...field} />}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      Custom Format (yyyy-MM-dd)
                    </p>
                    <FormFields
                      name="customFormatDate"
                      control={form.control}
                      render={({ field }) => (
                        <DatePicker {...field} dateFormat="yyyy-MM-dd" />
                      )}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      With Min/Max Constraints
                    </p>
                    <FormFields
                      name="minMaxDate"
                      control={form.control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          minDate={new Date(2023, 0, 1)}
                          maxDate={new Date(2025, 11, 31)}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-medium">
                  Specialized Variants
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">Date-Time Picker</p>
                    <FormFields
                      name="appointmentDate"
                      control={form.control}
                      render={({ field }) => (
                        <DatePicker {...field} variant="date-time" />
                      )}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">Time Picker</p>
                    <FormFields
                      name="appointmentDate"
                      control={form.control}
                      render={({ field }) => (
                        <DatePicker {...field} variant="time" />
                      )}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">Month Picker</p>
                    <FormFields
                      name="birthDate"
                      control={form.control}
                      render={({ field }) => (
                        <DatePicker {...field} variant="month" />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Advanced Date Pickers</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-medium">Year Picker</p>
                  <FormFields
                    name="birthDate"
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker {...field} variant="year" />
                    )}
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Date Range Picker</p>
                  <FormFields
                    name="interval"
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker {...field} variant="range" />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Form Components */}
          <div className="card p-6">
            <h2 className="mb-6 text-xl font-semibold">
              Advanced Form Components
            </h2>

            <div className="space-y-6">
              {/* Radio Group Form Example */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Subscription Plan</h3>
                <FormFields
                  name="subscriptionPlan"
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      className="grid grid-cols-1 gap-4 md:grid-cols-3"
                      {...field}
                    >
                      <div className="rounded-lg border p-4 hover:bg-accent">
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="free" id="free" />
                          <div>
                            <label htmlFor="free" className="font-medium">
                              Free
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Basic features for personal use
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 hover:bg-accent">
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="pro" id="pro" />
                          <div>
                            <label htmlFor="pro" className="font-medium">
                              Pro
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Advanced features for professionals
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 hover:bg-accent">
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="enterprise" id="enterprise" />
                          <div>
                            <label htmlFor="enterprise" className="font-medium">
                              Enterprise
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Custom solutions for organizations
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              {/* Checkbox Form Example */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  Notification Preferences
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormFields
                    name="emailNotifications"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emailNotifications"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                        <label
                          htmlFor="emailNotifications"
                          className="font-medium"
                        >
                          Email Notifications
                        </label>
                      </div>
                    )}
                    message="Receive updates, newsletters, and important announcements"
                  />
                  <FormFields
                    name="smsNotifications"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="smsNotifications"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                        <label
                          htmlFor="smsNotifications"
                          className="font-medium"
                        >
                          SMS Notifications
                        </label>
                      </div>
                    )}
                    message="Enable SMS notifications to receive urgent updates"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Submit Form</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
