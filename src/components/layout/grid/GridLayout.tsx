import {PropsWithChildren} from "react";
import styles from "./GridLayout.module.css"

export function GridLayout(props: PropsWithChildren) {
    return <div className={styles.gridLayout}>
        {props.children}
    </div>
}