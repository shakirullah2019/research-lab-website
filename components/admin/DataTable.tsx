"use client";

import type { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: (item: T) => ReactNode;
  className?: string;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onEdit,
  onDelete,
}: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b dark:border-gray-800">
            {columns.map((col, i) => (
              <th
                key={i}
                className={`text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="text-center py-8 text-gray-400"
              >
                No items found
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="border-b dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900/50"
              >
                {columns.map((col, i) => (
                  <td key={i} className={`py-3 px-4 ${col.className || ""}`}>
                    {col.accessor(item)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
