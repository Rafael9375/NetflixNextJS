'use client'

import { getSession, signIn, signOut, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useCallback, useLayoutEffect, useState } from "react"
import bg from '../../public/images/loginForm/bgImage.jpg'
import logo from '../../public/images/loginForm/netflix-icon.svg'

import Image from 'next/image'
import GoogleButton from 'react-google-button'
import InputField from "../components/loginForm/inputFiled"
import HandleSignup from "../components/loginForm/handleSignup"

type userData = {
    email: string
    password: string
}

export default function App() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [variant, toggleVariant] = useState('login')
    const [errorMessageLogin, setErrorMessageLogin] = useState('')
    const [errorMessagePassword, setErrorMessagePassword] = useState('')


    let session
    const rt = useRouter()


    const handleLogin = () => {
        console.log('asd')
        let newUser = {} as userData
        newUser.email = login
        newUser.password = password
        if(password.length < 8){
            setErrorMessagePassword('Password must be at least 8 characters long')
            return
        }

        if (variant == "login") {
            const ret = signIn('credentials', { login: login, password: password, callbackUrl: '/home', redirect: false })
                .then((res) => { if (!res?.error) { rt.replace('/home') } else {setErrorMessageLogin('E-Mail or Password invalid'), setErrorMessagePassword('E-Mail or Password invalid')}})
        }
        else {
            const data = HandleSignup(newUser).then((res) => {
                if (res.message) {
                    setErrorMessageLogin(res.message)
                }
                else{
                    const ret = signIn('credentials', { login: login, password: password, callbackUrl: '/home', redirect: false })
                        .then((res) => { if (!res?.error) { rt.replace('/home') } })
                }
            })
        }
    }

    useLayoutEffect(() => {setErrorMessageLogin(''), setErrorMessagePassword('')}, [login, password])

    // const handleLogin = async () => {
    //     console.log('dentro ')
    //     const ret = signIn('credentials', { login: login, password: password, callbackUrl: '/home', redirect: false })
    //     .then((res) => {if(!res?.error){rt.replace('/home')}})

    //     const session = await getSession()
    //     if(session?.userDetails){
    //         //rt.replace('/home')
    //     }
    // }



    return (
        <>

            <div className="h-screen " style={{ backgroundImage: `url(${bg.src})`, width: '100%', }} >

                <div className=" backdrop-opacity-25  bg-black/50 h-full" >
                    {/* <video autoPlay muted loop className="-z-10 absolute w-full ">         
                        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4"/>       
                    </video> */}
                    <Image src={logo} width={180} height={180} alt="a" className="p-5" />


                    <label></label>


                    <div className="backdrop-opacity-50 p-20 bg-black/70 box-content rounded-md mx-auto h-96 w-80 decoration-white" >
                        <p className="text-white mb-3 text-3xl font-medium" >Sign In {process.env.serverUrl}</p>
                        <div className="mb-4">
                            <InputField placeholder="Email" idName="login" onChange={(value) => { setLogin(value) }} errorMessage={errorMessageLogin} />
                        </div>

                        <div className="">
                            <InputField placeholder="Senha" idName="password" onChange={(value) => { setPassword(value) }} errorMessage={errorMessagePassword} />
                        </div>

                        <input type="button" className="font-medium bg-[#dd1212] mt-10 rounded-md hover:cursor-pointer text-[#ffffff] w-full h-12" value={variant == 'login' ? 'Login' : 'Sign Up'} onClick={() => handleLogin()}></input>

                        {/* <div className="items-center pl-10">
                            <GoogleButton className="mt-5 w-full p-0" onClick={() => signIn('google')}/> 
                        </div> */}

                        <div className="top-5 relative flex">
                            <div className="text-[#8b8b8b]">
                                {variant == "login" ? 'First time using Netflix?' : 'Already have an account?'}
                            </div>
                            <div className="text-white font-medium left-2 relative hover:cursor-pointer hover:underline" onClick={() => { if (variant == 'login') { toggleVariant('signup') } else { toggleVariant('login') } }}>
                                {variant == "login" ? 'Create an account' : 'Login'}
                            </div>
                        </div>



                    </div>
                </div>


            </div>


        </>
    )
}