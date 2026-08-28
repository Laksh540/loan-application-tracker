import { Children, isValidElement, type ReactElement, type ReactNode } from "react";

type ColumnProps<T> = {
  field?: keyof T;
  header: ReactNode;
  body?: (row: T) => ReactNode;
};

export function Column<T>(_props: ColumnProps<T>) {
  return null;
}

type TableProps<T extends object> = {
  data: T[];
  children: ReactElement<ColumnProps<T>> | ReactElement<ColumnProps<T>>[];
};

export default function Table<T extends object>({ data, children }: TableProps<T>) {
  const columns = Children.toArray(children).filter(
    (child): child is ReactElement<ColumnProps<T>> => isValidElement(child),
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            {columns.map((column, index) => (
              <th key={index} className="p-3">
                {column.props.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="p-3">
                  {column.props.body
                    ? column.props.body(row)
                    : column.props.field
                      ? String(row[column.props.field])
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
