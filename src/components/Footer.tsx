import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer footer-center p-4 bg-neutral text-white decoration-white absolute bottom-0">
            <div className="grid grid-flow-col gap-4">
                <Link href="faq"><a className="link link-hover">FAQ</a></Link>
                <Link href=""><a className="link link-hover">Contact</a></Link>
                <Link href=""><a className="link link-hover">Terms &amp; Conditions</a></Link>
            </div>
        </footer>
    )
}