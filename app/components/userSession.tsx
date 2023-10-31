'use client'
import { useSession } from "next-auth/react";
import { JsxElement } from "typescript";

export default function UserSession(){
    const session = useSession()
    return(
        session
    )
}