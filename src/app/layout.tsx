import type {Metadata} from "next";
import styles from "./layout.module.css";
import globals from "./globals.module.css";
import {classNames} from "../utils/classnames";

export const metadata: Metadata = {
    title: "YATL",
    description: "Yet Another Todo List",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={classNames(styles.root, globals.root)}>
        <body>
            {children}
        </body>
        </html>
    );
}
