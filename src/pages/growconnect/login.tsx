import Auth from "@/components/growconnect/Auth";
import GrowConnectLayout from "@/components/layouts/GrowConnectLayout";
import { ReactNode } from "react";


function LoginPage() {
    return <Auth redirectTo="/growconnect/app" />;
}

LoginPage.getLayout = (page: ReactNode) => (
    <GrowConnectLayout>
        {page}
    </GrowConnectLayout>
)

export default LoginPage;