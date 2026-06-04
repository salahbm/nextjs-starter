'use client';

import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useAlert } from '@/providers/alert';

export default function PrimitivesPage() {
  const alert = useAlert();
  const t = useTranslations();

  return (
    <div className="container mx-auto pb-8">
      <h1 className="mb-6 text-3xl font-bold">Theme Demo</h1>

      <h2 className="text-xl font-semibold text-primary">
        {t('Metadata.title')}
      </h2>
      <p className="mb-8 text-muted-foreground">{t('Metadata.description')}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">UI Components</h2>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Radio Group</h3>
            <div className="card p-4">
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <label htmlFor="option-one">Option One</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <label htmlFor="option-two">Option Two</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-three" />
                  <label htmlFor="option-three">Option Three</label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Checkbox</h3>
            <div className="card p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" defaultChecked />
                  <label
                    htmlFor="newsletter"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Subscribe to newsletter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled" disabled />
                  <label
                    htmlFor="disabled"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Disabled option
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Sheet</h3>
            <div className="card p-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>
                      This is a description for the sheet dialog.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p>Sheet content goes here</p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Alert</h3>
            <div className="card p-4">
              <Button
                onClick={() =>
                  alert({ title: 'Confirm', description: 'Are you sure?' })
                }
              >
                Open Alert
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Tooltip</h3>
            <div className="flex justify-center card p-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover Me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Accordion</h3>
            <div className="card p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that match your theme.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you
                    prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Command</h3>
            <div className="card p-4">
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                  <CommandGroup heading="Actions">
                    <CommandItem>New File</CommandItem>
                    <CommandItem>New Project</CommandItem>
                    <CommandItem>New Task</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Popover</h3>
            <div className="flex justify-center card p-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="leading-none font-medium">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="width">Width</label>
                        <Input
                          id="width"
                          defaultValue="100%"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="height">Height</label>
                        <Input
                          id="height"
                          defaultValue="25px"
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Tabs Variants</h3>
            <div className="grid gap-6">
              <div className="card p-4">
                <h4 className="typo-body-1 mb-4">Default Tabs</h4>
                <Tabs defaultValue="account">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="p-4">
                    Account tab content
                  </TabsContent>
                  <TabsContent value="password" className="p-4">
                    Password tab content
                  </TabsContent>
                  <TabsContent value="settings" className="p-4">
                    Settings tab content
                  </TabsContent>
                </Tabs>
              </div>

              <div className="card p-4">
                <h4 className="mb-4 font-medium">Outline Tabs</h4>
                <Tabs defaultValue="profile">
                  <TabsList variant="outline" className="w-full">
                    <TabsTrigger variant="outline" value="profile">
                      Profile
                    </TabsTrigger>
                    <TabsTrigger variant="outline" value="notifications">
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger variant="outline" value="appearance">
                      Appearance
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent variant="outline" value="profile">
                    Profile tab content
                  </TabsContent>
                  <TabsContent variant="outline" value="notifications">
                    Notifications tab content
                  </TabsContent>
                  <TabsContent variant="outline" value="appearance">
                    Appearance tab content
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-medium">Cards</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="card">
                <h4 className="font-semibold">Card Title</h4>
                <p className="text-sm text-muted-foreground">
                  Card description goes here
                </p>
              </div>
              <div className="card-md">
                <h4 className="font-semibold">Card Title</h4>
                <p className="text-sm text-muted-foreground">
                  Card description goes here
                </p>
              </div>
              <div className="card-lg">
                <h4 className="font-semibold">Card Title</h4>
                <p className="text-sm text-muted-foreground">
                  Card description goes here
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <h3 className="text-xl font-medium">FONTS</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="card p-4">
                <h4 className="typo-header">Header</h4>
                <p className="typo-title">Title</p>
                <p className="typo-subtitle">Subtitle</p>
                <p className="typo-body-1">Body 1</p>
                <p className="typo-body-2">Body 2</p>
                <p className="typo-caption-1">Caption 1</p>
                <p className="typo-caption-2">Caption 2</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
