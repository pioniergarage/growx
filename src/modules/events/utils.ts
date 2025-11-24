export function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

export const formatEventTime = (date: Date, duration: number) => {
    const start = date.toLocaleString('DE-de', {
        hour: '2-digit',
        minute: '2-digit',
    });
    if (duration <= 0) {
        return start;
    }
    const endTime = addMinutes(date, duration).toLocaleString('DE-de', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return start + ' - ' + endTime;
};

/**
 * calculates an events endDate by a given startDate and duration. if duration is 0 a default value of 120 minutes is used.
 * @param startDate the date to start calculation.
 * @param durationMinutes the duration of the event.
 * @returns the calculated endDate.
 */
export const calculateEndDate = (startDate: Date, durationMinutes: number) => {
    if (durationMinutes == 0) {
        durationMinutes = 120;
    }
    return new Date(startDate.getTime() + durationMinutes * 60 * 1000);
}
