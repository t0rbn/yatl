"use client"

import {Button} from "@/components/buttons/Buttons";
import {logout} from "@/app/login/actions";

export function LogoutButton() {
    return <Button icon="logout" onClick={() => logout()}/>
}