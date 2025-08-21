import fs from "fs";
import ical, { ICalCalendarMethod } from "ical-generator";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const events = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "events.json"), "utf-8")
    );

    const calendar = ical({ name: "PionierGarage GROW Events" });
    calendar.method(ICalCalendarMethod.REQUEST);

    for (const e of events) {
        calendar.createEvent({
            start: new Date(e.date),
            end: new Date(new Date(e.date).getTime() + 60 * 60 * 1000),
            summary: e.title,
            description: e.description,
            location: e.location ?? "",
            url: e.url ?? "https://grow.pioniergarage.de/",
        });
    }

    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader(
        "Content-Disposition",
        'attachment; filename="calendar.ics"'
    );

    res.send(calendar.toString());

    // return new NextResponse(calendar.toString(), {
    //     status: 200,
    //     headers: {
    //         "Content-Type": "text/calendar; charset=utf-8",
    //         "Content-Disposition": 'attachment; filename="calendar.ics"',
    //     },
    // });

    // const calendar = ical({ name: "my first iCal" });

    // // Required for Outlook to display as invitation
    // calendar.method(ICalCalendarMethod.REQUEST);

    // const startTime = new Date();
    // const endTime = new Date();
    // endTime.setHours(startTime.getHours() + 1);

    // calendar.createEvent({
    //     start: startTime,
    //     end: endTime,
    //     summary: "Example Event",
    //     description: "It works ;)",
    //     location: "my room",
    //     url: "http://sebbo.net/",
    // });


}
