'use client';

import { useState } from 'react';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { GridIcon, Loader2, RowsIcon } from 'lucide-react';
import Image from 'next/image';

import { api } from '@hendaz/backend/convex/_generated/api';
import { Doc } from '@hendaz/backend/convex/_generated/dataModel';
import { Label } from '@hendaz/ds/ui-kit/lib/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hendaz/ds/ui-kit/lib/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hendaz/ds/ui-kit/lib/ui/tabs';

import { columns } from './columns';
import FileCard from './file-card';
import DataTable from './file-table';
import SearchBar from './search-bar';
import UploadButton from './upload-button';

function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image alt="an image of a picture and directory icon" width="300" height="300" src="/empty.svg" />
      <div className="text-2xl">You have no files, upload one now</div>
      <UploadButton />
    </div>
  );
}

function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const { isLoaded: orgIsLoadded, organization } = useOrganization();
  const { isLoaded: userIsLoaded, user } = useUser();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<Doc<'files'>['type'] | 'all'>('all');
  const orgId = orgIsLoadded && userIsLoaded ? (organization?.id ?? user?.id) : null;
  const favorites = useQuery(api.files.getAllFavorites, orgId ? { orgId } : 'skip');

  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          deletedOnly,
          favorites: favoritesOnly,
          orgId,
          query,
          type: type === 'all' ? undefined : type,
        }
      : 'skip',
  );
  const isLoading = files === undefined;

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some((favorite) => favorite.fileId === file._id),
    })) ?? [];

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <SearchBar query={query} setQuery={setQuery} />
        <UploadButton />
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
          <TabsList className="mb-2">
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <RowsIcon /> Table
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center">
            <Label htmlFor="type-select">Type Filter</Label>
            <Select
              value={type}
              onValueChange={(newType) => {
                setType(newType as any);
              }}
            >
              <SelectTrigger id="type-select" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your files...</div>
          </div>
        )}

        <TabsContent value="grid">
          <div className="grid grid-cols-3 gap-4">
            {modifiedFiles.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="table">
          <DataTable columns={columns} data={modifiedFiles} />
        </TabsContent>
      </Tabs>

      {files?.length === 0 && <Placeholder />}
    </>
  );
}

export default FileBrowser;
