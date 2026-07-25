'use client';

import { FC, useMemo, useState } from 'react';

import Link from 'next/link';

import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { cn } from '@/lib/utils';

import { SIDENAV, SideNavItem } from '@/constants/routes';

import { usePathname } from '@/i18n/routing';
import { useSidebar } from '@/store/sidebar';

import { DynamicIcon } from './sidebar-icon';

const isPathActive = (pathname: string | null, href: string) => {
  if (!pathname) return false;

  if (href === '/') return pathname === '/';

  // Check if the path matches the href
  return (
    pathname === href ||
    (pathname.startsWith(href) &&
      href !== '/' &&
      pathname.charAt(href.length) === '/')
  );
};

const SidebarNav: FC = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const { isMinimized } = useSidebar();
  const [expanded, setExpanded] = useState<string[]>([]);

  const { activeParent, activeChild } = useMemo(() => {
    let parent: SideNavItem | undefined;
    let child: SideNavItem | undefined;

    // First check for exact child matches
    for (const item of SIDENAV) {
      if (item.children) {
        for (const c of item.children) {
          if (isPathActive(pathname, c.href)) {
            parent = item;
            child = c;
            break;
          }
        }
      }
      if (child) break;
    }

    // If no child match, check for parent match
    if (!parent) {
      for (const item of SIDENAV) {
        if (isPathActive(pathname, item.href)) {
          parent = item;
          break;
        }
      }
    }

    return { activeParent: parent, activeChild: child };
  }, [pathname]);

  const onAccordionChange = (value: string | string[]) =>
    setExpanded(value ? (Array.isArray(value) ? value : [value]) : []);

  const navItemClasses = (isActive: boolean) =>
    cn(
      'flex items-center gap-2 rounded px-4 py-3 w-full duration-300 cursor-pointer transition-colors whitespace-nowrap hover:bg-accent hover:text-sidebar-accent-foreground',
      isActive
        ? 'bg-sidebar-primary/10 text-sidebar-primary font-medium hover:bg-sidebar-primary/20'
        : 'text-sidebar-foreground',
    );

  const labelClasses = cn(
    'overflow-hidden whitespace-nowrap transition-all duration-300',
    isMinimized ? 'max-w-0 opacity-0 blur-sm' : 'max-w-xs opacity-100 blur-0',
  );

  return (
    <nav
      aria-label="Sidebar Navigation"
      className={cn(
        'no-scrollbar min-h-0 w-full flex-1 overflow-y-auto px-2 py-5 transition-all duration-300',
        isMinimized ? 'hidden md:block' : 'block',
      )}
    >
      <div className="space-y-1">
        {SIDENAV.map((item) => {
          const hasChildren = !!item.children?.length;
          const isActive = activeParent?.href === item.href;
          const isChildActive = !!activeChild;

          if (hasChildren) {
            return (
              <Accordion
                key={item.href}
                type="multiple"
                value={expanded}
                onValueChange={onAccordionChange}
              >
                <AccordionItem value={item.label} className="border-none">
                  <AccordionTrigger
                    className={cn(
                      navItemClasses(
                        isActive ||
                          (activeParent?.label === item.label && isChildActive),
                      ),
                      isMinimized && 'justify-center px-2 [&>svg]:hidden',
                    )}
                    title={t(`Sidebar.${item.label}`)}
                  >
                    <span className="flex items-center gap-2">
                      <DynamicIcon
                        name={item.icon}
                        className="size-5 text-current"
                        aria-hidden
                      />
                      <span className={labelClasses}>
                        {t(`Sidebar.${item.label}`)}
                      </span>
                    </span>
                  </AccordionTrigger>
                  {!isMinimized && (
                    <AccordionContent>
                      <div className="space-y-1 pt-1 pl-6">
                        {item.children!.map((child) => {
                          const childActive = isPathActive(
                            pathname,
                            child.href,
                          );
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={navItemClasses(childActive)}
                              aria-current={childActive ? 'page' : undefined}
                            >
                              <DynamicIcon
                                name={child.icon}
                                className="size-5 text-current"
                                aria-hidden
                              />
                              {t(`Sidebar.${child.label}`)}
                            </Link>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  )}
                </AccordionItem>
              </Accordion>
            );
          }

          const isItemActive = isPathActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                navItemClasses(isItemActive),
                isMinimized && 'justify-center px-2',
              )}
              aria-current={isItemActive ? 'page' : undefined}
              title={item.label}
            >
              <DynamicIcon name={item.icon} className="size-5 text-current" />
              <span className={labelClasses}>{t(`Sidebar.${item.label}`)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarNav;
