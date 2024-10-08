import { ReactNode } from 'react';
import { useQuery } from 'convex/react';
import { formatRelative } from 'date-fns';
import { FileTextIcon, GanttChartIcon, ImageIcon } from 'lucide-react';
import Image from 'next/image';

import { api } from '@hendaz/backend/convex/_generated/api';
import { Doc } from '@hendaz/backend/convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@hendaz/ds/ui-kit/lib/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@hendaz/ds/ui-kit/lib/ui/card';

import FileCardActions from './file-actions';

interface FileCardProps {
  readonly file: Doc<'files'> & { isFavorited: boolean; url: string | null };
}

function FileCard({ file }: FileCardProps) {
  const userProfile = useQuery(api.users.getUserProfile, { userId: file.userId });

  const typeIcons = {
    csv: <GanttChartIcon />,
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
  } as Record<Doc<'files'>['type'], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div> {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={file.isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === 'image' && file.url && <Image alt={file.name} width="200" height="100" src={file.url} />}
        {file.type === 'csv' && <GanttChartIcon className="w-20 h-20" />}
        {file.type === 'pdf' && <FileTextIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-gray-700">
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}

export default FileCard;
