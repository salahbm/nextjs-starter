import { Button } from './button';

export default {
  title: 'UI/Button',
};

export function Variants() {
  return (
    <div className="flex flex-wrap gap-3 p-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
