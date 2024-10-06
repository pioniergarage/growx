/**
 * The current kickoff date in YYYY-MM-DD
 */
export const KICKOFF_DATE = new Date("2024-11-02")

/**
 * The current midterm date in YYYY-MM-DD
 */
export const MIDTERM_DATE = new Date("2024-12-14")

/**
 * The current finale date in YYYY-MM-DD
 */
export const FINALE_DATE = new Date("2025-01-18")

/**
 * Gets the current GROW season as a string. (i.e. if GROW_YEAR is 2024, the season is '24/25')
 * @returns The current GROW year.
 */
export const getCurrentSeason = () => {
    const year_number = KICKOFF_DATE.getFullYear();
    const start_year = year_number.toString();
    const end_year = (year_number + 1).toString();

    return `${start_year.slice(-2)}/${end_year.slice(-2)}`
};