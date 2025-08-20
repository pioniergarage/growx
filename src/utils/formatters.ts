/**
 * Formats a date as "D. MM YYYY" for easy display. If 'today' is passed, returns placeholder if 'date' is more than 6 months in the past.
 * @param date The date to format.
 * @param today (Optional) if passed, will be compared to 'date'. If 'today' is after 'date', will return 'placeholder' instead of the formatted 'date'.
 * @param placeholder (Optional) if passed, 'placeholder' will be returned instead of the formatted date if Today is after the date. Otherwise, 'TBD' will be returned instead.
 * @returns The formatted date.
 */
export const growFormattedDate = (date: Date, today?: Date, placeholder?: string) => {
    const defaultPlaceholder = 'TBA';

    if (today) {
        const cutoff = new Date(today);
        cutoff.setMonth(cutoff.getMonth() - 6);
        if (date < cutoff) {
            return placeholder ?? defaultPlaceholder;
        }
    }
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${day}. ${month} ${year}`;
}

/**
 * Gets the current GROW season as a string based off the kickoff date (i.e. if 'kickoff' is in 2024, the season is '24/25')
 * @param kickoff The kickoff date.
 * @returns The current GROW year, formatted.
 */
export const getCurrentSeason = (kickoff: Date) => {
    const year_number = kickoff.getFullYear();
    const start_year = year_number.toString();
    const end_year = (year_number + 1).toString();

    return `${start_year.slice(-2)}/${end_year.slice(-2)}`
};