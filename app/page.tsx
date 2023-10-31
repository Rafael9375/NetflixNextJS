'use client'
import { getSession, signIn, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { SyntheticEvent, useCallback, useEffect, useState } from "react"
import handleCookie from "./components/handleCookie"
import NavBar from "./components/navBar"
import LoginButton from "./components/logoffButton"
import LoginForm from "./components/loginForm/loginForm"
import UseModal from "./components/browseHome/useModal"
import { Session } from "inspector"


export default function Home(){ 
    const router = useRouter()
    useEffect(() => {
        
        router.replace('/login')
    }, [])
    
    return(
        <></>
    )
}