import GrowConnectLayout from "@/components/layouts/GrowConnectLayout"
import { ReactNode } from "react"

function App() {
    return <>Hello World!</>
}

App.getLayout = (page: ReactNode) => (
    <GrowConnectLayout>
        {page}
    </GrowConnectLayout>
)

export default App
