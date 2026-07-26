'use client';

import * as React from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tabsListVariants = cva(
  'inline-flex h-9 w-fit items-center justify-center rounded',
  {
    variants: {
      variant: {
        default: 'bg-muted text-muted-foreground p-[3px]',
        outline: 'border-b border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const tabsTriggerVariants = cva(
  "text-foreground dark:text-muted-foreground inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 typo-body-2 whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-')]:size-4",
  {
    variants: {
      variant: {
        default:
          'data-[state=active]:bg-background dark:data-[state=active]:text-foreground  px-4 py-3  data-[state=active]:text-primary focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 h-[calc(100%-1px)] rounded border border-transparent focus-visible:ring-[3px] data-[state=active]:shadow-sm',
        outline:
          'border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary -mb-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const tabsContentVariants = cva('flex-1 outline-none', {
  variants: {
    variant: {
      default: '',
      outline: 'pt-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, className }))}
      {...props}
    />
  );
}

function TabsContent({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ variant, className }))}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsContentVariants,
  tabsListVariants,
  tabsTriggerVariants,
};
