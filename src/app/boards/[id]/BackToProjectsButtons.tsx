"use client"
import {useRouter} from "next/navigation";
import {Button} from "@/components/buttons/Buttons";

export function BackToProjectsButton() {
    const router = useRouter();
    return <Button label="back" onClick={() => router.push('/')} />
}