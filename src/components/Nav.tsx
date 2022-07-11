import Link from "next/link";
import BurgerIcon from "icons/BurgerIcon";

const Nav = () => {
    return (
        <>
            <div className="navbar bg-base-100 bg-primary text-primary-content">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <BurgerIcon />
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link href="/timetable">
                                    <a>Timetable</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/timetable">
                                    <a>Item 2</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link href="/">
                        <a className="btn btn-ghost normal-case text-xl">
                            Grow X
                        </a>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li>
                            <Link href="/timetable">
                                <a>Timetable</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/timetable">
                                <a>Item 2</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link href="/">
                        <a className="btn btn-sm btn-outline">Participate</a>
                    </Link>
                </div>
            </div>
        </>
    );
};
export default Nav;
