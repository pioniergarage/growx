import GrowConnectLayout from "@/components/layouts/GrowConnectLayout"
import { ReactNode } from "react"

function NotFound() {
    return (
        <div className="flex flex-col w-full items-center pt-10">
            <span className="text-4xl font-black">Page not found</span>
        </div>
    )
}

NotFound.getLayout = (page: ReactNode) => (
    <GrowConnectLayout>
        {page}
    </GrowConnectLayout>
)

export default NotFound
