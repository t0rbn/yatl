"use client"
import {useRouter} from "next/navigation";

export function BackToProjectsButton() {
    const router = useRouter();
    return <button onClick={() => router.push('/')}>
        Back to Projects
    </button>
}