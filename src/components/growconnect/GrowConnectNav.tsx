import Link from "next/link";
import BurgerIcon from "icons/BurgerIcon";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import { useUser } from "@supabase/auth-helpers-react";

export default function GrowConnectNav() {
    const router = useRouter()
    const { user } = useUser()

    const handleLogout: MouseEventHandler = async (e) => {
        e.preventDefault()
        await supabaseClient.auth.signOut()
        router.push('/growconnect/login')
    }


    const links = <>
        <li>
            <Link href="/growconnect/profile">
                <a>Profile</a>
            </Link>
        </li>
        <li>
            <Link href="/growconnect/startups">
                <a>Startups</a>
            </Link>
        </li>
        <li>
            <button onClick={handleLogout}>Logout</button>
        </li>
    </>




    return (
        <>
            <div className="navbar bg-base-100 bg-primary text-primary-content">
                <div className="navbar-start">
                    {user ? (
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <BurgerIcon />
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                {links}
                            </ul>
                        </div>
                    ) : undefined}
                    <Link href="/growconnect/">
                        <a className="btn btn-ghost normal-case text-xl">
                            GROWconnect
                        </a>
                    </Link>
                </div>
                {user ? (
                    <div className="navbar-end hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            {links}
                        </ul>
                    </div>
                ) : undefined}
            </div>
        </>
    );
};