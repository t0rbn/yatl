"use client"

import {signup} from "@/app/login/actions";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import {TextInput} from "@/components/inputs/Inputs";
import {useState} from "react";
import {Button, ButtonGroup} from "@/components/buttons/Buttons";
import {useRouter} from "next/navigation";
import styles from "../page.module.css"
import globalStyles from "@/globals.module.css"
import {classNames} from "@/utils/classnames";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (data: FormData) => {
        const res = await signup(data)

        if (!res.success) {
            setErrorMessage(res.error)
            return
        }

        setErrorMessage(null)
        router.push('/boards')
    }


    return <div className={classNames(globalStyles.glass, styles.container)}>
        <form action={handleSubmit}>
            <VerticalContentLayout>
                <h1>Create New Account</h1>
                <TextInput label="User" required name="username"/>
                <TextInput label="Password" required type="password" name="password"/>
                <TextInput label="Repeat Password" required type="password" name="password_repeat"/>
                {errorMessage ? <p>{errorMessage}</p> : null}
                <ButtonGroup
                    left={<Button variant="text" label="Back To Login" onClick={() => router.push('/login')} /> }
                    right={<Button type="submit" label="Create User"/>}
                />

            </VerticalContentLayout>
        </form>
    </div>
}