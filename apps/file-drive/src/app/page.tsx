import { Button } from '@hendaz/ds/ui-kit';

export default function Index() {
  return (
    <div className="bg-slate-600 h-screen w-full flex items-center justify-center flex-col">
      <h1 className="text-white text-6xl">Hello world</h1>
      <br />
      <div className="flex gap-2">
        <Button>Button</Button>
        <Button variant="destructive">Button</Button>
        <Button variant="outline">Button</Button>
      </div>
    </div>
  );
}
