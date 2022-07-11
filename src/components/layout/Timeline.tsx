
function Arrow() {
    return (
        <div className="flex flex-col items-center h-full">
            <div className="vertical-line h-full rounded" style={{ 'margin': '0 0 -2px 0' }}></div>
            <i className="arrow-down"></i>
        </div>
    )
}

function TimelineItem({ date, title, description }: { date: string, title: string, description: string }) {
    return (
        <div className="text-left p-4">
            <p className="leading-none text-sm">
                {date}
                <span className="block text-xl leading-tight font-bold">{title}</span>
            </p>
            <p className="leading-tight">{description}</p>
        </div>
    )
}

export default function Timeline() {
    const events = [
        {
            date: "10.Nov 22", title: "Kickoff Event",
            description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've done in the last 5 weeks in front of a small audience and the jury. `
        },
        {
            date: "10.Nov 22", title: "Midterm Pitch",
            description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've done in the last 5 weeks in front of a small audience and the jury. `
        },
        {
            date: "10.Nov 22", title: "Finale",
            description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've done in the last 5 weeks in front of a small audience and the jury. `
        }
    ]
    return (
        <div className="flex">
            <div className="w-32">
                <Arrow />
            </div>
            <div>
                {events.map(event => (
                    <TimelineItem {...event} key={event.title} />
                ))}
            </div>
        </div>
    )
}