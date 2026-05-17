"use client";

import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import styles from "./Lane.module.css"
import globalStyles from "@/globals.module.css"
import {useModal} from "@/components/modal/modalContext";
import {EditTaskModal} from "../EditTaskModal";
import {useRouter} from "next/navigation";
import {updateStatus} from "@/app/(logged-in)/boards/[id]/actions";
import {useState} from "react";
import {classNames} from "@/utils/classnames";
import {Task, TaskStatus} from "../../../../../../prisma/generated/prisma/client";

interface LaneProps {
    name: string;
    status: TaskStatus;
    tasks: Task[];
}

function TaskCard(props: { task: Task, index: number }) {
    const modal = useModal()

    const handleClick = () => {
        modal.show({title: 'Edit Task', content: <EditTaskModal task={props.task}/>})
    }

    const handleDragStart = (ev: any) => {
        ev.dataTransfer.setData("text/plain", props.task.id);
    }

    return <div
        className={styles.taskCard}
        onClick={() => handleClick()}
        draggable
        onDragStart={handleDragStart}
        onDragOver={e => e.preventDefault()}
        role="button" data-index={props.index}
        tabIndex={0}
    >
        <VerticalContentLayout>
            <strong>{props.task.name}</strong>
            {props.task.description ? <p>{props.task.description}</p> : null}
        </VerticalContentLayout>
    </div>
}

export default function Lane(props: LaneProps) {
    const [dragging, setDragging] = useState<boolean>(false)
    const modal = useModal()

    const handleDrop = async (ev: any) => {
        setDragging(() => false)
        const taskId = ev.dataTransfer.getData('text/plain')
        const result = await updateStatus(taskId, props.status)
        if (!result.success) {
            modal.show({title: "Error", content: <p>{result.error}</p>})
        }
    }

    return <div className={styles.laneContainer}>
        <h2>{props.name}</h2>
        <div
            className={classNames(globalStyles.glass, styles.lane, dragging ? styles.dragOver : null)}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onDragEnter={() => setDragging(true)}
            onDragLeave={() => setDragging(false)}
        >
            {props.tasks.map((task, i) => <TaskCard key={task.id} index={i} task={task}/>)}
        </div>
    </div>
}