import { XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-white p-4 shadow-lg">
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">Status change not allowed</p>
          <p className="mt-1 text-sm text-slate-600">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close toast"
        >
          ×
        </button>
      </div>
    </div>
  );
}
