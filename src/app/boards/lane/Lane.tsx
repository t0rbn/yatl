import {Task} from "@/types/task";
import styles from "./Lane.module.css";

interface LaneProps {
    name: string;
    tasks: Task[];
}

function TaskCard(props: {task: Task}) {
    return <div className={styles.taskCard}>
        <strong>{props.task.name}</strong>
        <p>{props.task.description}</p>
    </div>
}

export default function Lane(props: LaneProps) {
    return <div className={styles.laneContainer}>
        <h2>{props.name}</h2>
        <div className={styles.lane}>
            {props.tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
    </div>
}