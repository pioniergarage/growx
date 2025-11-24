
/**
 * Formats a date as "D. MM YYYY" for easy display. If 'today' is passed, returns placeholder if 'date' is more than 6 months in the past.
 * @param date The date to format.
 * @param today (Optional) if passed, will be compared to 'date'. If 'today' is after 'date', will return 'placeholder' instead of the formatted 'date'.
 * @param placeholder (Optional) if passed, 'placeholder' will be returned instead of the formatted date if Today is after the date. Otherwise, 'TBD' will be returned instead.
 * @returns The formatted date.
 */
export const growFormattedDate = (date: Date, today?: Date, placeholder?: string, show_time?: boolean) => {
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


    if (show_time) {
        const time = date.toLocaleString('DE-de', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${day}. ${month} ${year}, ${time}`;
    }

    return `${day}. ${month} ${year}`;
}

/**
 * Formats a given date as YYYYMMDDTHHMMSSZ, the required date format for ICS files.
 * @param date the date to format.
 * @returns the ICS-formatted date.
 */
export const formatDateToICS = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Gets the current GROW season as a string based off the kickoff date (i.e. if 'kickoff' is in 2024, the season is '24/25')
 * @param kickoff The kickoff date.
 * @param offset Years to subtract from the kickoff year.
 * @returns The current GROW year, formatted.
 */
export const getSeason = (kickoff: Date, offset?: number) => {
    if (!offset)
        offset = 0
    const year_number = kickoff.getFullYear() - offset;
    const start_year = year_number.toString();
    const end_year = (year_number + 1).toString();

    return `${start_year.slice(-2)}/${end_year.slice(-2)}`
};