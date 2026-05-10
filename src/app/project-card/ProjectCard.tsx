import {PropsWithChildren} from "react";
import {Project} from "@/types/project";
import Link from "next/link";
import styles from "./ProjectCard.module.css";

export function ProjectCard(props: PropsWithChildren<{ project: Project }>) {
    return <Link href={`/boards/${props.project.id}`} className={styles.projectCard}>
        <div>
            <h2>{props.project.name}</h2>
        </div>
    </Link>
}