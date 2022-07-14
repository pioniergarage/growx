import FAQ from "@/components/FAQ";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Nav from "../components/Nav";

const TimeTable: NextPage = () => {
    const [open, setOpen] = useState(-1)

    const faqs = [
        { question: "Can I participate from outside of Karlsruhe? 👀", answer: "Yes, of course 😄" },
        { question: "Who build this awesome website? 😍", answer: "It was built by our IT team ❤️" },
    ]

    function handleToggle(i: number) {
        setOpen(open === i ? -1 : i)
    }

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-bold">FAQ</h1>
            <div className="mt-4 grid gap-4">
                {faqs.map((faq, i) => <FAQ key={i} question={faq.question} open={open === i} onToggle={() => handleToggle(i)}>{faq.answer}</FAQ>)}
            </div>
        </div>
    );
};
export default TimeTable;
