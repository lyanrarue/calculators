import type { CalculatorResult } from '../../calculators/types';
import { formatCurrency } from '../../utils/formatters';

interface ResultDisplayProps {
  result: CalculatorResult | null;
  error: string | null;
  isCalculating: boolean;
}

export function ResultDisplay({
  result,
  error,
  isCalculating,
}: ResultDisplayProps) {
  // Show error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Calculation Error
            </h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show calculating state
  if (isCalculating) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          <span className="ml-3 text-sm text-green-700">Calculating...</span>
        </div>
      </div>
    );
  }

  // Show result
  if (result) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        {result.type === 'single' && (
          <div className="text-center">
            <p className="text-sm font-medium text-green-800 mb-2">
              {result.label || 'Result'}
            </p>
            <p className="text-3xl font-bold text-green-900">
              {formatCurrency(result.value)}
            </p>
          </div>
        )}

        {result.type === 'multiple' && (
          <div className="space-y-3">
            {result.values.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-green-200 last:border-b-0"
              >
                <span className="text-sm font-medium text-green-800">
                  {item.label}
                </span>
                <span className="text-lg font-bold text-green-900">
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        )}

        {result.type === 'table' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-green-200">
              <thead>
                <tr>
                  {result.headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {result.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-2 text-sm text-green-900"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {result.type === 'chart' && (
          <div className="text-center text-sm text-green-800">
            Chart visualization coming soon...
          </div>
        )}
      </div>
    );
  }

  // Show placeholder when no result yet (waiting for complete inputs)
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <div className="text-center">
        <div className="mb-3">
          <svg
            className="mx-auto h-12 w-12 text-green-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-green-800 mb-1">
          Ready to Calculate
        </p>
        <p className="text-xs text-green-600">
          Fill in all fields above to see your result
        </p>
      </div>
    </div>
  );
}
