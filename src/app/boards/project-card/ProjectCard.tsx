import {PropsWithChildren} from "react";
import Link from "next/link";
import styles from "./ProjectCard.module.css";
import {Project} from "../../../../prisma/generated/prisma/client";

export function ProjectCard(props: PropsWithChildren<{ project: Project }>) {
    return <Link href={`/boards/${props.project.id}`} className={styles.projectCard}>
        <div>
            <strong>{props.project.name}</strong>
        </div>
    </Link>
}