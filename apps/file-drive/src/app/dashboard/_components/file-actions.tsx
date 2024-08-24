import { useState } from 'react';
import { Protect } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { FileIcon, MoreVertical, StarHalf, StarIcon, TrashIcon, UndoIcon } from 'lucide-react';

import { api } from '@hendaz/backend/convex/_generated/api';
import { Doc } from '@hendaz/backend/convex/_generated/dataModel';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@hendaz/ds/ui-kit/lib/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@hendaz/ds/ui-kit/lib/ui/dropdown-menu';
import { useToast } from '@hendaz/ds/ui-kit/lib/ui/use-toast';

interface FileCardActionsProps {
  readonly file: Doc<'files'> & { url: string | null };
  readonly isFavorited: boolean;
}

function FileCardActions({ file, isFavorited }: FileCardActionsProps) {
  const { toast } = useToast();
  const me = useQuery(api.users.getMe);
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for our deletion process. Files are deleted periodically
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });

                toast({
                  description: 'Your file will be deleted soon',
                  title: 'File marked for deletion',
                  variant: 'default',
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              if (!file.url) return;

              window.open(file.url, '_blank');
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            <FileIcon className="w-4 h-4" /> Download
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({ fileId: file._id });
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            {isFavorited && (
              <div className="flex gap-1 items-center">
                <StarIcon className="w-4 h-4" /> Unfavorite
              </div>
            )}
            {!isFavorited && (
              <div className="flex gap-1 items-center">
                <StarHalf className="w-4 h-4" /> Favorite
              </div>
            )}
          </DropdownMenuItem>

          <Protect condition={(check) => check({ role: 'org:admin' }) || file.userId === me?._id} fallback={<></>}>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({ fileId: file._id });
                } else {
                  setIsConfirmOpen(true);
                }
              }}
              className="flex gap-1 items-center cursor-pointer"
            >
              {file.shouldDelete && (
                <div className="flex gap-1 text-green-600 items-center cursor-pointer">
                  <UndoIcon className="w-4 h-4" /> Restore
                </div>
              )}
              {!file.shouldDelete && (
                <div className="flex gap-1 text-red-600 items-center cursor-pointer">
                  <TrashIcon className="w-4 h-4" /> Delete
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default FileCardActions;
