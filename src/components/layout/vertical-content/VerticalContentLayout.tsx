import {PropsWithChildren} from "react";
import styles from "./VerticalContentLayout.module.css"

export function VerticalContentLayout(props: PropsWithChildren) {
    return <div className={styles.verticalContentLayout}>
        {props.children}
    </div>
}