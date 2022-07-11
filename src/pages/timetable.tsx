import { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";

const TimeTable: NextPage = () => {
    return (
        <div>
            <Head>
                <title>GrowX - Timetable</title>
                <meta name="description" content="GrowX - Timetable" />
            </Head>
            <main>
                <Nav />
                <h1 className="text-3xl font-bold underline">Timetable WIP</h1>
            </main>
        </div>
    );
};
export default TimeTable;
