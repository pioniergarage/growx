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