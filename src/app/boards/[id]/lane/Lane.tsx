"use client";

import {Task, TaskStatus} from "@/types/task";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import styles from "./Lane.module.css"
import {useModal} from "@/components/modal/modalContext";
import {EditTaskModal} from "../EditTaskModal";
import {useRouter} from "next/navigation";
import {updateStatus} from "@/app/boards/[id]/actions";

interface LaneProps {
    name: string;
    status: TaskStatus;
    tasks: Task[];
}

function TaskCard(props: { task: Task }) {
    const modal = useModal()

    const handleClick = () => {
        modal.show({title: 'Edit Task', content: <EditTaskModal task={props.task}/>})
    }

    const handleDragStart = (ev: any) => {
         ev.dataTransfer.setData("text/plain", props.task.id);
    }

    return <div className={styles.taskCard} onClick={() => handleClick()} draggable onDragStart={handleDragStart}>
        <VerticalContentLayout>
            <strong>{props.task.name}</strong>
            <p>{props.task.description}</p>
        </VerticalContentLayout>
    </div>
}

export default function Lane(props: LaneProps) {
    const router = useRouter();

    const handleDrop = (ev: any) => {
        const taskId = ev.dataTransfer.getData('text/plain')
        updateStatus(taskId, props.status)
            .then(() => router.refresh())

    }

    return <div className={styles.laneContainer} onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
        <h2>{props.name}</h2>
        <div className={styles.lane}>
            {props.tasks.map(task => <TaskCard key={task.id} task={task}/>)}
        </div>
    </div>
}