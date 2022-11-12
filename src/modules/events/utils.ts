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
