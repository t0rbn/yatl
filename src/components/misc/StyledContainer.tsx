import {CSSProperties, PropsWithChildren} from "react";
import {classNames} from "../../utils/classnames";

interface StyledContainerProps {
    className?: string | Array<string>,
    styles?: CSSProperties
}

export function StyledContainer(props: PropsWithChildren<StyledContainerProps>) {
    const cns = (() => {
        if (!props.className) {
            return undefined;
        }
        if (Array.isArray(props.className)) {
            return classNames(...props.className)
        }
        return props.className;
    })()

    return (
        <div className={cns} style={props.styles}>
            {props.children}
        </div>
    );
}