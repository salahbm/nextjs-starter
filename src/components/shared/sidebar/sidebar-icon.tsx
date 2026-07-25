import { FC } from 'react';

import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

type IconComponentType = React.ComponentType<LucideProps>;

// Dynamic icon component that renders icons by name
export const DynamicIcon: FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => {
  // Cast the dynamic icon to the appropriate component type
  const Icon = (Icons[name as keyof typeof Icons] ||
    Icons.Circle) as IconComponentType;
  return <Icon className={className} />;
};
