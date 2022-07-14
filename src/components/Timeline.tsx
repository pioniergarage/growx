
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
        <div className="text-left pb-4 md:p-0">
            <p className="leading-none text-sm md:text-base">
                {date}
            </p>
            <h3 className="block leading-tight md:mb-2 text-secondary">{title}</h3>
            <p className="leading-tight md:leading-normal">{description}</p>
        </div>
    )
}

export default function Timeline() {
    const events = [
        {
            date: "10. Nov 22", title: "Kickoff Event",
            description: `Pitch your idea, find a team or simply learn more about the contest. 
            The kickoff is where the fun starts, no matter whether you have already applied or you're up for a spontaneous adventure. `
        },
        {
            date: "14. Dec 22", title: "Midterm Pitch",
            description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've done in the last 5 weeks in front of a small audience and the jury. `
        },
        {
            date: "10. Jan 23", title: "Finale",
            description: `Pitch your results of the contest and win prizes. This is what you've been working for! 
            Pitch one last time in front of a huge audience and show what you've learned and how far you have come.... `
        }
    ]
    return (
        <div className="px-4 flex flex-col items-center md:items-start">
            <h2 className="text-center">From idea to prototype in 11 weeks</h2>
            <div className="flex w-full mt-4">
                <div className="w-32 md:hidden">
                    <Arrow />
                </div>
                <div className="flex-grow md:grid md:grid-cols-3 gap-6 justify-between ml-2 md:ml-0">
                    {events.map(event => (
                        <TimelineItem {...event} key={event.title} />
                    ))}
                </div>
            </div>
        </div>
    )
}