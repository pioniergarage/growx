/**
 * Formats a date as "D. MM YYYY" for easy display
 * @param date The date to format.
 * @returns The formatted date.
 */
export const growFormattedDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}. ${month} ${year}`;
}