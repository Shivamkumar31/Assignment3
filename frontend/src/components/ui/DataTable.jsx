// src/components/ui/DataTable.jsx
import React from 'react';

/**
 * Reusable Data Table component.
 * @param {Array<Object>} data - Array of data objects to display.
 * @param {Array<Object>} columns - Array of column definitions: [{ header: string, accessor: string }]
 */
const DataTable = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <div className="p-4 text-center text-gray-500 bg-white rounded-lg shadow-md">No data to display.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex} 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {/* Access the data using the accessor key */}
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;