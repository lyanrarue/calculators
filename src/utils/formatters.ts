/**
 * Format a number as currency with $ prefix and 2 decimal places
 * @param value - The number to format
 * @returns Formatted currency string (e.g., "$1234.56")
 */
export const formatCurrency = (value: number): string => {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  const formatted = absoluteValue.toFixed(2);

  return isNegative ? `-$${formatted}` : `$${formatted}`;
};

/**
 * Format a number as percentage with % suffix and 2 decimal places
 * @param value - The number to format (e.g., 3.5 for 3.5%)
 * @returns Formatted percentage string (e.g., "3.50%")
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

/**
 * Format a number with commas and specified decimal places
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted number string (e.g., "1,234.56")
 */
export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Parse a formatted currency string to a number
 * @param value - The currency string to parse
 * @returns The parsed number value
 */
export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[$,]/g, '');
  return parseFloat(cleaned) || 0;
};
