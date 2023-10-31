'use client'

import { signOut } from "next-auth/react"


export default function LogoffButton(){
    return(
        <input type="button" onClick={() => signOut()} value="Logoff"></input>
    )
}