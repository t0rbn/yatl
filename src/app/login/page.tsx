"use client"

import {login} from "@/app/login/actions";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import {TextInput} from "@/components/inputs/Inputs";
import {useState} from "react";
import {Button, ButtonGroup} from "@/components/buttons/Buttons";
import {useRouter} from "next/navigation";
import styles from "./page.module.css"
import globalStyles from "@/globals.module.css"
import {classNames} from "@/utils/classnames";
import {ErrorBar} from "@/components/error-bar/ErrorBar";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()
    const handleSubmit = async (data: FormData) => {
        const res = await login(data)

        if (!res.success) {
            setErrorMessage(res.error)
            return
        }

        setErrorMessage(null)
        router.push('/boards')
    }

    const signUpButton = () => {
        if (process.env.NEXT_PUBLIC_ENABLE_SIGNUP !== 'true') {
            return null
        }
        return <Button variant="text" icon="person_add" label="Create Account" onClick={() => router.push('/login/signup')}/>
    }

    return <div className={classNames(globalStyles.glass, styles.container)}>
        <form action={handleSubmit}>
            <VerticalContentLayout>
                <h1>Login</h1>
                <TextInput label="User" required name="username"/>
                <TextInput label="Password" required type="password" name="password"/>
                {errorMessage ? <ErrorBar text={errorMessage} /> : null}
                <ButtonGroup
                    left={signUpButton()}
                    right={<Button type="submit" icon="login" label="Login"/>}
                />

            </VerticalContentLayout>
        </form>
    </div>
}