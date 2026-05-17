import React, {PropsWithChildren} from "react";
import styles from "./HeaderContentLayout.module.css";
import globalStyles from "@/globals.module.css";
import {classNames} from "@/utils/classnames";

interface AppHeaderProps {
    title: string;
    backHref?: string;
    actionButtons?: React.ReactNode[];
}

export function HeaderContentLayout(props: PropsWithChildren<AppHeaderProps>) {
    return <div className={styles.headerContentLayout}>
        <header className={classNames(globalStyles.glass, styles.appHeader)}>
            <h1>{props.title}</h1>
            {props.actionButtons?.map((b,i) => <div key={i} className={styles.buttonContainer}>{b}</div>)}
        </header>
        <main>{props.children}</main>
    </div>
}