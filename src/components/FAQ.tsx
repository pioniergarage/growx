import { createContext, MouseEventHandler, ReactNode } from "react"

interface Props {
    question: string,
    onToggle: MouseEventHandler<HTMLButtonElement> ,
    open: boolean,
    children: ReactNode
}

const faqContext = createContext(false);
export default function FAQ({ question, children, onToggle, open, ...restProps }: Props) {
    return (
        <div {...restProps}>
            <button onClick={onToggle} className="block w-full border border-primary hover:border-primary-focus py-2 px-4 rounded flex justify-between cursor-pointer select-none" {...restProps}>
                <span className="font-bold ">{question}</span>
                <div className="text-primary">{open ? '^' : '+'}</div>
            </button>
            {open ? <div className="py-2 px-4" {...restProps}>{children}</div> : null}
        </div>
    )
}
