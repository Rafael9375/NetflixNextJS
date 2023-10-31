'use client'

import { signIn, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import bg from '../../../public/images/loginForm/bgImage.jpg'
import logo from '../../../public/images/loginForm/netflix-icon.svg'
import InputField from "./inputFiled"
import Image from 'next/image'
import GoogleButton from 'react-google-button'

export default function LoginForm(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const rt = useRouter()
    const session = null

    const handleLogin = () => {
        console.log('dentro ')
        const ret = signIn('credentials', { login: login, password: password })
        console.log('retorno do log ', ret)
    }
    
    return(
        <>
            
            <div className=" " style={{backgroundImage: `url(${bg.src})`, width: '100%', height: '100%', }} >
                
                <div className=" backdrop-opacity-25  bg-black/50" style={{height: '100%'}}>
                    {/* <video autoPlay muted loop className="-z-10 absolute w-full ">         
                        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4"/>       
                    </video> */}
                    <Image src={logo} width={180} height={180} alt="a" className="p-5"/>
                    
                    
                    <label></label>

                    
                    <div className="backdrop-opacity-50 p-20 bg-black/70 box-content rounded-md mx-auto h-80 w-80 decoration-white" >
                        <p className="text-white mb-3 text-3xl font-medium" >Entrar</p>
                        <div className="mb-4">
                            <InputField placeholder="Email" idName="login" onChange={(value) => {setLogin(value)}}/>
                        </div>

                        <div className="">
                            <InputField placeholder="Senha" idName="password" onChange={(value) => {setPassword(value)}}/>    
                        </div>                  
                        
                        <input type="button" className="font-medium bg-[#dd1212] mt-10 rounded-md hover:cursor-pointer text-[#ffffff] w-full h-12" value="Entrar" onClick={() => {handleLogin()}}></input>

                        <div className="items-center pl-10">
                            <GoogleButton className="mt-5 w-full p-0" onClick={() => signIn('google')}/> 
                        </div>
                        
                    </div>
                </div>
                
                
            </div>
            

        </>
    )
}