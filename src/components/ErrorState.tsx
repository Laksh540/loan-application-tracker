import { AlertCircle } from "lucide-react";
import Button from "./Button";

type ErrorStateProps = {
  title: string;
  message: string;
  onRetry: () => void;
};

const ErrorState = ({ title, message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 text-center">
      <AlertCircle className="mb-4 h-12 w-12 text-red-500" />

      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

      <p className="my-2 max-w-sm text-sm text-gray-500">{message}</p>

      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
};

export default ErrorState;
