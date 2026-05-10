import {classNames} from "@/utils/classnames";
import styles from "./Buttons.module.css";
import {Icon} from "@/components/icon/Icon";

interface ButtonProps {
    label?: string;
    icon?: string;
    onClick?: () => void;
    type?: string;

    variant?: 'default' | 'text'
    color?: 'default' | 'danger'

}

export function Button(props: ButtonProps) {
    const classes = classNames(
        styles.button,
        props.color === 'danger' ? styles.danger : null,
        props.variant === 'text' ? styles.textVariant : null
    )

    return <button onClick={props.onClick} className={classes} type={props.type as any}>
        {props.icon ? <Icon className={styles.icon} icon={props.icon}/> : null}
        {props.label ? <span className={styles.label}>{props.label}</span> : null}
    </button>
}

export function ButtonGroup(props: { left: React.ReactNode, right: React.ReactNode }) {
    return <div className={styles.buttonGroup}>
        {props.left}
        <div className={styles.spacer}/>
        {props.right}
    </div>
}