import { Link } from "react-router-dom";

type HeaderProps = {
  title: string;
  description: string;
  linkLabel?: string;
  linkTo?: string;
};

export default function Header({
  title,
  description,
  linkLabel,
  linkTo,
}: HeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-1 text-gray-600">{description}</p>
      {linkLabel && linkTo && (
        <Link
          to={linkTo}
          className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:underline"
        >
          ← {linkLabel}
        </Link>
      )}
    </header>
  );
}
