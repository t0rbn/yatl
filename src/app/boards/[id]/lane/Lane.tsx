"use client";

import {Task} from "@/types/task";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import styles from "./Lane.module.css"
import {useModal} from "@/components/modal/modalContext";
import {EditTaskModal} from "../EditTaskModal";

interface LaneProps {
    name: string;
    tasks: Task[];
}

function TaskCard(props: { task: Task }) {
    const modal = useModal()
    const handleClick = () => {
        modal.show({title: props.task.name, content: <EditTaskModal task={props.task} />})
    }

    return <div className={styles.taskCard} onClick={() => handleClick()}>
        <VerticalContentLayout>
            <strong>{props.task.name}</strong>
            <p>{props.task.description}</p>
        </VerticalContentLayout>
    </div>
}

export default function Lane(props: LaneProps) {
    return <div className={styles.laneContainer}>
        <h2>{props.name}</h2>
        <div className={styles.lane}>
            {props.tasks.map(task => <TaskCard key={task.id} task={task}/>)}
        </div>
    </div>
}