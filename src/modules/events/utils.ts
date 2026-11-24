export function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

export function getEventExternalUrl(event: {
    ref?: string | null;
    href: string | null;
}) {
    const href = event.href?.trim();
    if (!href || !/^https?:\/\//i.test(href)) return null;

    try {
        const url = new URL(href);
        if (event.ref !== 'midterm') return url.href;

        const isLuma = ['luma.com', 'lu.ma'].includes(
            url.hostname.replace(/^www\./, '')
        );
        if (
            url.protocol === 'https:' &&
            isLuma &&
            !url.username &&
            !url.password &&
            !url.port
        ) {
            return url.href;
        }
    } catch {
        return null;
    }

    return null;
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
