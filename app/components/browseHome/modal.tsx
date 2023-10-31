import { MovieInterface } from "@/types";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import LoadMovies from "./loadMovies";
import useInfoModalStore from "./useModalStore";
import { data } from "autoprefixer";
import Movie from "./movieComponent";


interface ModalProps {
    dataMovie: MovieInterface
    setVisible: Dispatch<SetStateAction<boolean>>
    visible: boolean
    isFavorite: boolean
    setFavoritList: Dispatch<SetStateAction<string[]>>
    favoritList: string[]
}


export default function Modal({ dataMovie, visible, setVisible, favoritList, setFavoritList, isFavorite }: ModalProps) {


    const [style, setStyle] = useState("opacity-0 -z-50")


    let Icon = dataMovie?.isFavorite ? CheckCircleIcon : PlusCircleIcon;

    useEffect(() => {
        if (visible) {
            setStyle("opacity-100 z-50")
        }
        else {
            setStyle("opacity-0 -z-50")
        }

    }, [visible])

    useEffect(() => {

    }, [dataMovie])

    const updateFavorites = () => {
        let _favoritList = new Array()
        favoritList.forEach((item) => {
            _favoritList.push(item)
        })
        const index = favoritList.indexOf(dataMovie.id.toString())
        if (isFavorite) {

            if (index != -1) {
                _favoritList.splice(index, 1)
            }
        }
        else {
            _favoritList.push(dataMovie.id.toString())
        }

        console.log('favoritList 1', _favoritList)
        setFavoritList(_favoritList)
    }

    return (
        <>
            <div >
                <div className={style + " duration-500 transition-all fixed left-0 bg-opacity-50 w-screen h-full top-0 pt-24  place-content-center flex justify-center overflow-y-auto overflow-x-auto bg-black"} aria-hidden="true">
                    <div className='bg-[#1a1a1a] rounded-lg w-1/2 h-[700px] max-w-[900px]'>
                        <div className="relative text-right grid justify-items-end p-4 -top-20">
                            <div onClick={() => { setVisible(false) }} className="bg-[#1a1a1a] z-50 h-8 w-8 text-white text-lg rounded-full place-content-center justify-center grid hover:cursor-pointer active:border-2 active:border-white active:border-solid">
                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 place-content-center justify-center items-center relative">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                                </div>

                            </div>
                        </div>

                        <div className=" h-2/5 rounded-lg relative -top-36 w-full ">
                            <div className="h-full bg-[#1a1a1a]">
                                <Movie url={dataMovie?.videoUrl} keyProp={dataMovie?.id} />
                            </div>


                            <div className=" pl-14 -top-20 relative ">
                                <div className="text-6xl text-white drop-shadow-md">
                                    {dataMovie?.title}
                                </div>
                                <div className="flex pt-5 pb-14">
                                    <div className="bg-[#ffffff] pt-2 pb-2 pl-6 pr-6 rounded mt-5 w-36 flex hover:cursor-pointer hover:bg-[#dddddd] relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                        </svg>
                                        <p className="pl-4 font-medium">Play</p>
                                    </div>
                                    <div className="ml-5 text-white relative top-4 hover:cursor-pointer">
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
                                </div>
                                <div className="bg-transparent h-2/5 rounded z-50 pr-14 top-full text-white absolute">
                                    {dataMovie?.description}<br />
                                    {dataMovie?.videoUrl}<br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}