import {classNames} from "@/utils/classnames";
import styles from "./Buttons.module.css";

interface ButtonProps {
    label?: string;
    onClick?: () => void;

    color?: 'default' | 'primary' | 'ok' | 'danger'

}

export function Button(props: ButtonProps) {
    const classes = classNames(
        styles.button,
        props.color === 'primary' ? styles.primary : null,
        props.color === 'ok' ? styles.ok : null,
        props.color === 'danger' ? styles.danger : null,
    )

    return <button onClick={props.onClick} className={classes}>
        {props.label ? <label>{props.label}</label> : null}
    </button>
}