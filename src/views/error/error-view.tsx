import { ErrorLayout } from './error-layout';

type ErrorViewProps = {
  title: string;
  description: string;
  actionLabel: string;
  onRetry: () => void;
};

export function ErrorView({
  title,
  description,
  actionLabel,
  onRetry,
}: ErrorViewProps) {
  return (
    <ErrorLayout
      code="500"
      title={title}
      description={description}
      actionLabel={actionLabel}
      actionType="retry"
      onRetry={onRetry}
    />
  );
}
