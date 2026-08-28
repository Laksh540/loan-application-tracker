import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  label: string;
  value: string;
}

type DropdownProps = {
  value: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export default function Dropdown({
  value,
  options,
  onChange,
  label,
  disabled = false,
  readOnly = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => !disabled && !readOnly && setOpen(!open)}
        disabled={disabled}
        className={`flex w-full items-center justify-between rounded border focus:border-transparent px-3 py-2 focus:ring-2 focus:ring-blue-700 ${
          disabled
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
            : readOnly
              ? "cursor-default border-gray-200 bg-gray-50 text-gray-700"
              : "border-gray-300 bg-white"
        }`}
      >
        <span>{selected?.label}</span>
        <span className={`transition ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white shadow">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${
                value === option.value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
