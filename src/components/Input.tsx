type InputProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  label?: string;
  readOnly?: boolean;
};

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  label,
  readOnly = false,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        tabIndex={readOnly ? -1 : 0}
        className={`w-full rounded border px-3 py-2 ${
          readOnly
            ? "cursor-default border-gray-200 bg-gray-50 text-gray-700"
            : "border-gray-300 bg-white"
        }`}
      />
    </div>
  );
}
