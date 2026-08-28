import type { ReactNode } from "react";

type TableEmptyStateProps = {
  title: string;
  description: ReactNode;
};

export function TableEmptyState({
  title,
  description,
}: TableEmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
