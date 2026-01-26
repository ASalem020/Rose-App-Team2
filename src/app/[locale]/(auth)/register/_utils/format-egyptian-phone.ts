/**
 * Formats Egyptian phone numbers to international format (+20).
 * 
 * @param {string} phone - Phone number (e.g., "01234567890" or "1234567890")
 * @returns {string} Formatted phone with +20 prefix
 * 
 * @example
 * formatEgyptianPhone("01234567890") // "+201234567890"
 * formatEgyptianPhone("1234567890")  // "+201234567890"
 */
export function formatEgyptianPhone(phone: string): string {
  const trimmed = phone.trim();
  
  // Already formatted
  if (trimmed.startsWith('+20')) return trimmed;
  
  // Starts with 0 (11 digits) -> +20...
  if (trimmed.startsWith('0') && trimmed.length === 11) {
    return `+2${trimmed}`;
  }
  
  // Starts with 1 (10 digits) -> +201...
  if (trimmed.startsWith('1') && trimmed.length === 10) {
    return `+20${trimmed}`;
  }
  

  return trimmed;
}