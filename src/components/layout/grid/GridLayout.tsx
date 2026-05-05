import {PropsWithChildren} from "react";
import {StyledContainer} from "../../misc/StyledContainer";
import styles from "./GridLayout.module.css"

export function GridLayout(props: PropsWithChildren) {
    return <StyledContainer className={styles.gridLayout}>
        {props.children}
    </StyledContainer>
}