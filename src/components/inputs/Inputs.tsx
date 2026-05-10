import styles from "./Inputs.module.css"

interface InputProps<T> {
    label: string;
    name?: string,
    defaultValue?: T
    required?: boolean
}

export function HiddenInput(props: {name: string, value: any}) {
    return <input type="hidden" readOnly name={props.name} value={props.value}/>
}

export function TextInput(props: InputProps<string>) {
    return <label className={styles.label}>
        <span>{props.label}</span>
        <input type="text" defaultValue={props.defaultValue} required={props.required} name={props.name}/>
    </label>

}

export function TextArea(props: InputProps<string>) {
    return <label className={styles.label}>
        <span>{props.label}</span>
        <textarea defaultValue={props.defaultValue} required={props.required} name={props.name} rows={5}/>
    </label>
}


export function SelectInput(props: InputProps<string> & { options: Array<{ name: string, value: string }> }) {
    return <label className={styles.label}>
        <span>{props.label}</span>
        <select defaultValue={props.defaultValue} required={props.required} name={props.name}>
            {props.options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
        </select>
    </label>
}