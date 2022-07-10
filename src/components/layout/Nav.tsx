import Link from "next/link";
import NavBar from "./NavBar";

const Nav = () => {
    return (
        <>
            <nav className="flex justify-between items-center p-4 bg-gray-800">
                <Link href="/">
                    <a className="text-white text-2xl font-bold">GrowX</a>
                </Link>
                <NavBar />
            </nav>
        </>
    );
};
export default Nav;
