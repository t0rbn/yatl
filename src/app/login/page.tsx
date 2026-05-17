"use client"

import {login} from "@/app/login/actions";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import {TextInput} from "@/components/inputs/Inputs";
import {useState} from "react";
import {Button} from "@/components/buttons/Buttons";
import {useRouter} from "next/navigation";

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


    return <div>
        <form action={handleSubmit}>
            <VerticalContentLayout>
                <TextInput label="User" required name="username"/>
                <TextInput label="Password" required type="password" name="password"/>
                {errorMessage ? <p>{errorMessage}</p> : null}
                <Button type="submit" label="Login"/>
            </VerticalContentLayout>
        </form>
    </div>
}