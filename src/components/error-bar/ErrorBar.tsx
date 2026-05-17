import styles from "./ErrorBar.module.css"

interface ErrorBarProps {
    text: string
}

export function ErrorBar(props: ErrorBarProps) {
    return <div className={styles.errorBar}>
        {props.text}
    </div>
}