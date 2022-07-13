import Link from "next/link";

export default function WaitingForBlock() {
    return (
        <div className="flex flex-col items-center text-center md:text-left md:items-start px-4">
            <h2>What Are You Waiting For?</h2>
            <div className="w-4/5 mt-4">
                <p>If you are motivated to work with other students on new ideas and
                    concepts and want to learn all about startups, then GROW is the place for you!</p>
                <Link href="/">
                    <a className="btn btn-primary btn-wide mt-4">Participate</a>
                </Link>
            </div>
        </div>
    )
}