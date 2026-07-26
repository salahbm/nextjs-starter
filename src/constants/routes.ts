// Define routes and navigation structure

export const routes = {
  home: '/',
  signIn: '/sign-in',

  preferences: '/preferences',
  dev: '/dev/primitives',
  table: '/dev/table',
  forms: '/dev/forms',
  charts: '/dev/charts',
};

export interface SideNavItem {
  href: string;
  label: string;
  icon: string;
  children?: SideNavItem[];
}

// Define the navigation items
export const SIDENAV: SideNavItem[] = [
  {
    href: routes.home,
    label: 'dashboard',
    icon: 'LayoutDashboard',
  },
  {
    href: routes.preferences,
    label: 'preferences',
    icon: 'Settings',
  },
  {
    href: '#',
    label: 'dev',
    icon: 'Settings',
    children: [
      {
        href: routes.dev,
        label: 'primitives',
        icon: 'Palette',
      },
      {
        href: routes.table,
        label: 'table',
        icon: 'Table',
      },
      {
        href: routes.forms,
        label: 'forms',
        icon: 'Type',
      },
      {
        href: routes.charts,
        label: 'charts',
        icon: 'ChartNoAxesCombined',
      },
    ],
  },
];
