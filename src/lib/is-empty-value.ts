/**
 * Check if a value is empty
 * @param value - The value to check
 * @returns True if the value is empty, false otherwise
 */
const isEmptyValue = (value: unknown) => {
  if (value === undefined || value === null || value === '') return true;
  if (typeof value === 'number' && isNaN(value)) return true;
  if (typeof value === 'string' && value === 'NaN') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
};

export { isEmptyValue };
