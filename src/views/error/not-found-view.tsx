import { ErrorLayout } from './error-layout';

type NotFoundViewProps = {
  title: string;
  description: string;
  actionLabel: string;
};

export function NotFoundView({
  title,
  description,
  actionLabel,
}: NotFoundViewProps) {
  return (
    <ErrorLayout
      code="404"
      title={title}
      description={description}
      actionLabel={actionLabel}
      actionType="home"
    />
  );
}
