import {PropsWithChildren} from "react";
import styles from "./layout.module.css"

export default async function LoginLayout(props: PropsWithChildren) {
    return <div className={styles.layout}>
        {props.children}
    </div>
}