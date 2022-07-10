import Link from "next/link";

const NavBar = () => {
    return (
        <div className="flex items-center">
            <Link href="/">
                <a className="text-white text-2xl font-bold">Home</a>
            </Link>
            <Link href="/timetable">
                <a className="text-white text-2xl font-bold ml-4">Timetable</a>
            </Link>
        </div>
    );
};
export default NavBar;
