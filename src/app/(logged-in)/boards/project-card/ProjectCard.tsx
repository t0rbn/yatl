import {PropsWithChildren} from "react";
import Link from "next/link";
import styles from "./ProjectCard.module.css";
import globalStyles from "@/globals.module.css";
import {Project} from "../../../../../prisma/generated/prisma/client";
import {classNames} from "@/utils/classnames";


export function ProjectCard(props: PropsWithChildren<{ project: Project }>) {
    return <Link href={`/boards/${props.project.id}`} className={classNames(globalStyles.glass, styles.projectCard)}>
        <strong>{props.project.name}</strong>
    </Link>
}