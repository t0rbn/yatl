import {PropsWithChildren} from "react";
import {Project} from "@/types/project";
import Link from "next/link";
import styles from "./ProjectCard.module.css";

export function ProjectCard(props: PropsWithChildren<{ project: Project }>) {
    return <Link href={`/boards/${props.project.id}`} className={styles.projectCard}>
        <div>
            <strong>{props.project.name}</strong>
        </div>
    </Link>
}