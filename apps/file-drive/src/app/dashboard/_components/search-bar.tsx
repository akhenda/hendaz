import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, SearchIcon } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@hendaz/ds/ui-kit/lib/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@hendaz/ds/ui-kit/lib/ui/form';
import { Input } from '@hendaz/ds/ui-kit/lib/ui/input';

const formSchema = z.object({ query: z.string().min(0).max(200) });

type FormSchema = z.infer<typeof formSchema>;

function SearchBar({ query, setQuery }: { query: string; setQuery: Dispatch<SetStateAction<string>> }) {
  const form = useForm<FormSchema>({
    defaultValues: { query },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    setQuery(values.query);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="your file names" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size="sm" type="submit" disabled={form.formState.isSubmitting} className="flex gap-1">
          {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          <SearchIcon /> Search
        </Button>
      </form>
    </Form>
  );
}

export default SearchBar;
