'use client'

import LoadMovies from "@/app/components/browseHome/loadMovies";
import { MovieInterface } from "@/types";
import { getSession } from "next-auth/react";

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";


interface loadMoviesParam {
    userId: number,
    movieId: number
}

export default function Watch(){

    const [user, setUser] = useState()


    const [movieWatch, setMovieWatch] = useState({} as MovieInterface)
    const route = useRouter()
    const searchParams = useSearchParams()
    const search = parseInt(searchParams.get('movieId') as string)
    let param = {} as loadMoviesParam
    param.movieId = search
    useEffect(() => {
        LoadMovies(param)?.then(resp => {setMovieWatch(resp)})
    }, [])

    const loadLoginParameters = async () => {
        const log = await getSession()
        if (!log?.userDetails) {
            
            route.replace('/login')
        }
        
        setUser(log?.userDetails)
        
    }
    
    useEffect(() => {
        loadLoginParameters()
        
    }, [])

    

    
    return(
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                
                <svg onClick={() => {route.replace('/home')}} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>

                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">Watching: {movieWatch.title}</span>
                </p>
            </nav>
            <video className="h-full w-full" autoPlay controls src={movieWatch.videoUrl}></video>
        </div>
    )
}