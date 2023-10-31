import { MovieInterface } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import UpdateFavorites from "./updateFavorites";


interface MovieCardProps {
    data: MovieInterface;
    isFavorite: boolean;
    setModalMovie: Dispatch<SetStateAction<MovieInterface>>
    setModal: Dispatch<SetStateAction<boolean>>
    setFavoritList: Dispatch<SetStateAction<string[]>>
    favoritList: string[]
}

interface updateFavoritesParam {
    userId: number,
    movieId: number,
    operation: number
}

export default function Card({ data, isFavorite, setModalMovie, setModal, setFavoritList, favoritList }: MovieCardProps) {
    const router = useRouter()
    const [buttonClicked, setButtonClicked] = useState(false)

    const [favo, setFavo] = useState(isFavorite as boolean)


    const openModal = (a: any) => {

        console.log(a.tagName)
        if (!(a.tagName == "svg" || a.tagName == "path")) {
            setModalMovie(data)
            setModal(true)
            console.log('troquei ', data)
        }

    }

    if (!data.id) {
        return (
            <div className="w-[215px] h-full rounded relative top-10 ml-0.5 mr-0.5 drop-shadow-md "></div>
        )
    }

    const updateFavorites = () => {
        
        let _favoritList = new Array()
        let index = 0
        if(favoritList.length > 0){
            index = favoritList.indexOf(data.id.toString())
            favoritList.forEach((item) => {
                _favoritList.push(item)
            })
        }
        
        if(isFavorite){
            
            if (index != -1) {
                _favoritList.splice(index, 1)
            }
        }
        else{
            _favoritList.push(data.id.toString())
        }

        setFavoritList(_favoritList)
    }


    return (
        <div>
            <div onClick={(a) => openModal(a.target)} className="w-[215px] h-full rounded relative top-10 ml-0.5 mr-0.5 drop-shadow-md 
            hover:cursor-pointer hover:z-20 hover:h-80  hover:bg-[#1a1a1a] hover:-top-16 transition-[top] duartion-600 ">
                <div className="h-32 w-full hover:-z-20">
                    <img className=" rounded h-full w-full " src={data.thumbnailUrl}></img>
                </div>



                <div className=" absolute h-full pl-6 -top-8 w-full opacity-0 text-white transition-opacity hover:h-80 hover:opacity-100 group hover:pt-44 duration-800" >

                    <div className="invisible group-hover:visible h-80" >
                        <div className="flex" id={`modal_${data.id}`}>
                            <Link
                                href={{
                                    pathname: '/watch/',
                                    query: { movieId: data.id },
                                }}
                                onClick={() => setButtonClicked(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-100 hover:opacity-80">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <div onClick={() => { updateFavorites() }}>
                                {
                                    isFavorite ?
                                        (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 active:bg-[#a3a3a3] rounded-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 active:bg-[#a3a3a3] rounded-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </>
                                        )
                                }
                            </div>

                        </div>
                        <p className="asd">{data.title}</p>
                        <p>{isFavorite ? 'true' : 'false'}</p>

                        <p>teste</p>
                    </div>


                </div>

            </div>

        </div>

    )
}