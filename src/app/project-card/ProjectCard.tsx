import {PropsWithChildren} from "react";
import {Project} from "@/types/project";
import Link from "next/link";
import styles from "./ProjectCard.module.css";

export function ProjectCard(props: PropsWithChildren<{ project: Project, index: number }>) {
    return <Link href={`/boards/${props.project.id}`}>
        <div className={styles.projectCard} data-index={props.index}>
            <h2>{props.project.name}</h2>
        </div>
    </Link>
}