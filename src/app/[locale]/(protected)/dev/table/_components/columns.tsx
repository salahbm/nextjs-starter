'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { DataTableColumnHeader } from '@/components/shared/data-table/column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  lastLogin: Date;
  loginCount: number;
};

// Define possible status values and their colors
const statusOptions = [
  { value: 'active', label: 'Active', color: 'bg-green-500' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'inactive', label: 'Inactive', color: 'bg-gray-500' },
  { value: 'blocked', label: 'Blocked', color: 'bg-red-500' },
];

// Define possible roles
const roles = ['Admin', 'User', 'Editor', 'Viewer', 'Moderator'];

const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    meta: {
      label: 'ID',
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    meta: {
      label: 'Username',
    },
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    meta: {
      label: 'Full Name',
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    meta: {
      label: 'Email',
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    meta: {
      label: 'Role',
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusOption = statusOptions.find(
        (option) => option.value === status,
      );

      return (
        <Badge
          variant="outline"
          className={`${statusOption?.color} border-0 text-white`}
        >
          {statusOption?.label || status}
        </Badge>
      );
    },
    meta: {
      label: 'Status',
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return <div>{format(date, 'PPP')}</div>;
    },
    meta: {
      label: 'Created At',
    },
  },
  {
    accessorKey: 'lastLogin',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Login" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('lastLogin') as Date;
      return <div>{format(date, 'PPP')}</div>;
    },
    meta: {
      label: 'Last Login',
    },
  },
  {
    accessorKey: 'loginCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Login Count" />
    ),
    meta: {
      label: 'Login Count',
    },
  },
];

export { columns, roles, statusOptions, type User };
