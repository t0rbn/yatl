import type {Metadata} from "next";
import styles from "./layout.module.css";
import globals from "../globals.module.css";
import {classNames} from "../utils/classnames";
import {ModalProvider} from "@/components/modal/modalContext";

export const metadata: Metadata = {
    title: "YATL",
    description: "Yet Another Todo List",
    icons: {
        icon: [
            {url: "/icons/icon.svg", type: "image/svg+xml"},
            {url: "/icons/icon.png", type: "image/png", sizes: "512x512"},
        ],
        apple: [
            {url: "/icons/icon.png", sizes: "512x512"},
        ],
    },
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={classNames(styles.root, globals.root)}>
        <body>
        <ModalProvider>
            {children}
        </ModalProvider>
        </body>
        </html>
    );
}
