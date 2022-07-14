import FAQ from "@/components/FAQ";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import supabase from "../../utils/supabaseClient";
import Nav from "../components/Nav";

interface FaqType {
    question: string,
    answer: string
}

export async function getStaticProps() {
    const {data: faqs, error} = await supabase.from('faqs').select('*')
    if (error) {
        throw Error(error.message)
    }
    return { props: {faqs}}
}

export default function faqs({faqs}: {faqs: FaqType[]}) {
    const [open, setOpen] = useState(-1)

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
