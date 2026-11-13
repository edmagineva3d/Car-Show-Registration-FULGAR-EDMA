/**
 * Format a number as Philippine Peso currency (e.g. ₱42,000.00)
 */
export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return `₱${num.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

/**
 * Format an ISO date string as e.g. "Feb 10, 2027 08:30 AM"
 */
export function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getUTCMonth()];
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12';

    return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
  } catch {
    return dateString;
  }
}

/**
 * Format a standard integer with comma separators
 */
export function formatNumber(num) {
  return (Number(num) || 0).toLocaleString('en-US');
}
