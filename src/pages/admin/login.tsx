import Auth from "@/components/growconnect/Auth";
import AdminLayout from "@/components/layouts/AdminLayout";
import GrowConnectLayout from "@/components/layouts/GrowConnectLayout";
import { ReactNode } from "react";


function AdminLogin() {
    return <Auth redirectTo="/admin" />;
}

AdminLogin.getLayout = (page: ReactNode) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)

export default AdminLogin;