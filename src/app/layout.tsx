import type {Metadata} from "next";
import styles from "./layout.module.css";

export const metadata: Metadata = {
    title: "YATL",
    description: "Yet Another Todo List",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={styles.root}>
        <body>{children}</body>
        </html>
    );
}
