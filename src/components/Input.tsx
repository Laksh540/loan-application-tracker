type InputProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
};

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
      className="w-full rounded border px-3 py-2"
    />
  );
}
