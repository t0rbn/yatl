import styles from "./Icon.module.css"
import {classNames} from "@/utils/classnames";

interface IconProps {
    icon: string,
    className?: string
}

export function Icon(props: IconProps) {
    return <span className={classNames(styles.materialIcon, props.className)}>{props.icon}</span>
}