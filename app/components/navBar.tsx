'use client'
import { useSession } from "next-auth/react"

export default function NavBar(){
    const session = useSession()
    return(
        <>
            {
                session.data ? 
                (<div>{JSON.stringify(session)}</div>) 
                : 
                (<div>Não logou</div>)
            }
            
        </>
        
    )
}