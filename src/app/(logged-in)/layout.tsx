import {PropsWithChildren} from "react";
import {getCurrentUserId} from "@/utils/session";
import {redirect} from "next/navigation";

export default async function LoggedInLayout(props: PropsWithChildren) {
    if (! await getCurrentUserId()) {
        redirect('/login')
    }

    return props.children
}