import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Mahou Admin",
    description: "admininstrator page.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
