import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Bopl Battle Wiki!",
    description: "The unofficial wiki for the Bopl Battle bopl battle!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
            <meta name="viewport" content="height=device-height,
          width=device-width, initial-scale=1.0,
          minimum-scale=1.0" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
