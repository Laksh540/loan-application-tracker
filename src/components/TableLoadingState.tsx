export function TableLoadingState() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="grid grid-cols-5 gap-4">
          <div className="h-5 rounded bg-gray-200" />
          <div className="h-5 rounded bg-gray-200" />
          <div className="h-5 rounded bg-gray-200" />
          <div className="h-5 rounded bg-gray-200" />
          <div className="h-5 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
