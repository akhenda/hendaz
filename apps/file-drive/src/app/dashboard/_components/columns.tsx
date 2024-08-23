'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { useQuery } from 'convex/react';
import { formatRelative } from 'date-fns';

import { api } from '@hendaz/backend/convex/_generated/api';
import { Doc, Id } from '@hendaz/backend/convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@hendaz/ds/ui-kit/lib/ui/avatar';

import FileCardActions from './file-actions';

export type ColumnDefinition<T extends RowData = object, U = unknown> = ColumnDef<
  Doc<'files'> & { url: string | null; isFavorited: boolean } & T,
  U
>;

function UserCell({ userId }: { userId: Id<'users'> }) {
  const userProfile = useQuery(api.users.getUserProfile, { userId });

  return (
    <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
      <Avatar className="w-6 h-6">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  );
}

export const columns: ColumnDefinition[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'type', header: 'Type' },
  { cell: ({ row }) => <UserCell userId={row.original.userId} />, header: 'User' },
  {
    cell: ({ row }) => <div>{formatRelative(new Date(row.original._creationTime), new Date())}</div>,
    header: 'Uploaded On',
  },
  {
    cell: ({ row }) => <FileCardActions file={row.original} isFavorited={row.original.isFavorited} />,
    header: 'Actions',
  },
];
