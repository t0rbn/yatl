import {PropsWithChildren} from "react";
import {Project} from "@/types/project";
import Link from "next/link";
import {StyledContainer} from "@/components/misc/StyledContainer";
import styles from "./ProjectCard.module.css";

export function ProjectCard(props: PropsWithChildren<{ project: Project }>) {
    return <Link href={`/boards/${props.project.id}`}>
        <StyledContainer className={styles.projectCard}>
            <h2>{props.project.name}</h2>
        </StyledContainer>
    </Link>
}