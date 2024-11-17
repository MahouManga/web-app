import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import { validateRequest } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
    title: "Mahou Admin",
    description: "admininstrator page.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/");
    }
    return (
        <html lang="en">
            <body>
                <Sidebar>
                    {children}
                </Sidebar>
            </body>
        </html>
    );
}
