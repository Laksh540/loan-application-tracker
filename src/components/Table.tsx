export type TableColumn<T> = {
  key: keyof T;
  header: string;
};

type TableProps<T extends object> = {
  data: T[];
  columns: TableColumn<T>[];
};

export default function Table<T extends object>({
  data,
  columns,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            {columns.map((column) => (
              <th key={String(column.key)} className="p-3">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td key={String(column.key)} className="p-3">
                  {String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
