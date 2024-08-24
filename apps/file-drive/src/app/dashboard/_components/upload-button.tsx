'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOrganization, useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import { api } from '@hendaz/backend/convex/_generated/api';
import { Doc } from '@hendaz/backend/convex/_generated/dataModel';
import { Button } from '@hendaz/ds/ui-kit/lib/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hendaz/ds/ui-kit/lib/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@hendaz/ds/ui-kit/lib/ui/form';
import { Input } from '@hendaz/ds/ui-kit/lib/ui/input';
import { useToast } from '@hendaz/ds/ui-kit/lib/ui/use-toast';

const formSchema = z.object({
  file: z
    .custom<FileList>((val) => val instanceof FileList, 'Required')
    .refine((files) => files.length > 0, `Required`),
  title: z.string().min(1).max(200),
});

type FormSchema = z.infer<typeof formSchema>;

function UploadButton() {
  const { toast } = useToast();
  const { isLoaded: orgIsLoadded, organization } = useOrganization();
  const { isLoaded: userIsLoaded, user } = useUser();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const form = useForm<FormSchema>({
    defaultValues: { title: '' },
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register('file');
  const orgId = orgIsLoadded && userIsLoaded ? (organization?.id ?? user?.id) : null;
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const createFile = useMutation(api.files.createFile);

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    if (!orgId) return;

    const postUrl = await generateUploadUrl();
    const fileType = values.file[0].type;

    const result = await fetch(postUrl, {
      body: values.file[0],
      headers: { 'Content-Type': fileType },
      method: 'POST',
    });
    const { storageId } = await result.json();

    const types = {
      'application/pdf': 'pdf',
      'image/jpeg': 'image',
      'image/jpg': 'image',
      'image/png': 'image',
      'text/csv': 'csv',
    } as Record<string, Doc<'files'>['type']>;

    try {
      await createFile({ fileId: storageId, name: values.title, orgId, type: types[fileType] });
      form.reset();
      setIsFileDialogOpen(false);

      toast({ description: 'Now everyone can view your file', title: 'File Uploaded' });
    } catch (err) {
      toast({
        description: 'Your file could not be uploaded, try again later',
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Upload your File Here</DialogTitle>
          <DialogDescription>This file will be accessible by anyone in your organization</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="flex gap-1">
              {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadButton;
