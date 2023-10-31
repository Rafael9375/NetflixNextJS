'use client'

//import './browseHome.css'

import { MovieInterface } from "@/types";
import { use, useCallback, useEffect, useState } from "react";
import LoadFavorites from "../components/browseHome/loadFavorites";
import LoadMovies from "../components/browseHome/loadMovies";
import Image from 'next/image'
import logo from '../../public/images/loginForm/netflix-icon.svg'
import perfil from '../../public/images/loginForm/default-blue.png'
import LogoffButton from "../components/logoffButton";
import Card from "../components/browseHome/movieCard";
import { signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Modal from "../components/browseHome/modal";
import { Session } from "next-auth";
import MovieCardTest from "../components/browseHome/movieCardTest";
import UpdateFavorites from "../components/browseHome/updateFavorites";
import LoadFavoritList from "../components/browseHome/loadFavoritList";
import Link from "next/link";



export default function App() {


    let movie = {} as MovieInterface
    const [texto, setTexto] = useState('1')
    const [movies, setMovies] = useState({} as MovieInterface[])
    const [favorites, setFavorites] = useState({} as MovieInterface[])
    const [loginParameters, setLoginParameters] = useState({} as Session | null)
    const [favoritList, setFavoritList] = useState({} as string[])
    const [userId, setUserId] = useState(0)
    const [randomMovie, setRandomMovie] = useState({} as MovieInterface)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [navStyle, setNavStyle] = useState('transition-all bg-gradient-to-b from-black top-0 flex z-10 fixed w-full')
    const [movieLength, setMovieLength] = useState(0)
    const [modalMovie, setModalMovie] = useState({} as MovieInterface)
    const [user, setUser] = useState()

    //var item = items[Math.floor(Math.random()*items.length)];

    const [modal, setModal] = useState(false)
    const route = useRouter()

    let dataSession = {} as Session | null

    const handleRoute = () => {
        route.replace('/login')
    }

    const loadLoginParameters = () => {
        const log = getSession()
            .then((res) => {
                if (!res?.userDetails) {
                    handleRoute()

                }
                else {
                    setLoginParameters(res)
                    setUserId(res?.userDetails.id)
                    setUser(res?.userDetails)
                }
            })
    }

    useEffect(() => {

        loadLoginParameters()

        LoadMovies()?.then(resp => {
            setMovies(resp)
            setMovieLength(resp.length)
            let _movies = [] as Array<MovieInterface>
            for (let i = 0; i < 5; i++) {
                if (i < resp.length) {
                    _movies.push(resp[i])
                }
                else {
                    _movies.push({} as MovieInterface)
                }
            }
            setMovies(_movies)


        })

        //LoadFavorites(dataSession?.userDetails.id)?.then(resp => { setFavorites(resp) })
    }, [])

    useEffect(() => {

        if (userId > 0) {
            LoadFavorites(userId).then(resp => {
                setFavorites(resp)
            })

        }
    }, [userId])



    useEffect(() => {
        setModalMovie(randomMovie)

    }, [randomMovie])


    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);

    };

    useEffect(() => {
        if (scrollPosition > 10) {
            setNavStyle('bg-black')

        }
        else {
            setNavStyle('bg-gradient-to-b from-black')
        }
    }, [scrollPosition])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const isFavorite = (id: string | null) => {
        if (favoritList.length > 0 && id != null) {
            if (favoritList.includes((id as string).toString())) {
                return true
            }
        }
        return false

    }



    useEffect(() => {
        if (user != null) {
            UpdateFavorites((user as any).id, favoritList)

        }

    }, [favoritList])

    useEffect(() => {
        if (user != null) {
            const retLoadFavoritList = LoadFavoritList((user as any).id).then((_list) => {
                setFavoritList(_list)
            }
            )

        }

    }, [user])

    useEffect(() => {
        console.log('mudando movies')
        setRandomMovie(movies[Math.floor(Math.random() * movieLength)])
    }, [movies])



    return (
        <>

            {modalMovie ?
                <>
                    <Modal dataMovie={modalMovie} setVisible={setModal} visible={modal} isFavorite={isFavorite(modalMovie.id)} setFavoritList={setFavoritList} favoritList={favoritList} />
                </>
                :
                <></>
            }

            <div className="overscroll-none ">
                <div className="-z-10 absolute w-full">
                    <div className="relative -z-20">
                        {randomMovie != null ?
                            (
                                <video key={randomMovie.videoUrl} autoPlay muted loop className="bg-[#000000] w-full">
                                    <source src={randomMovie.videoUrl} type="video/mp4" />
                                </video>
                            )
                            :
                            (<></>)
                        }

                    </div>

                    <div className="bg-gradient-to-t from-black h-60 relative w-full z-10 -top-60" ></div>
                </div>

                <nav className={`top-0 flex z-10 fixed w-screen h-16 transition-all duration-500 ${navStyle}`}>

                    <Image src={logo} width={150} height={150} alt="a" className="p-5 pl-10" />
                    <div className="flex w-full">
                        <div className="text-white flex p-5 w-full">
                            <div className="ml-3 mr-3 hover:cursor-pointer hover:text-gray-400 transition-all duration-500">Home</div>
                            <div className="ml-3 mr-3 hover:cursor-pointer hover:text-gray-400 transition-all duration-500">Series</div>
                            <div className="ml-3 mr-3 hover:cursor-pointer hover:text-gray-400 transition-all duration-500">Films</div>
                            <div className="ml-3 mr-3 hover:cursor-pointer hover:text-gray-400 transition-all duration-500">New & Popular</div>
                        </div>
                        <div className="text-white w-full grid justify-items-end pr-10 p-5">
                            <div className="flex ">
                                <div className="ml-2 mr-2 hover:cursor-pointer hover:text-gray-400 transition-all duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <div className="ml-2 mr-2 hover:cursor-pointer hover:text-gray-400 transition-all duration-500">
                                    Kids
                                </div>
                                <div onClick={() => { route.replace('/login') }} className="ml-2 mr-2 hover:cursor-pointer hover:text-gray-400 transition-all duration-500">
                                    Logoff
                                </div>
                                <div className="ml-2 mr-2 hover:cursor-pointer hover:text-gray-400 transition-all duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                    </svg>
                                </div>
                                <div className="ml-2 mr-2 relative -top-[5px] hover:cursor-pointer hover:text-gray-400 transition-all duration-500">
                                    <Image src={perfil} width={32} height={32} alt="a" className="rounded " />
                                </div>
                            </div>

                        </div>
                    </div>


                </nav>

                <div className="pt-72" style={{ paddingLeft: '4%' }}>
                    <div className="text-white text-6xl w-2/4 drop-shadow-md">{randomMovie?.title}</div>
                    <div className="text-white text-xl w-2/5 mt-5">
                        {randomMovie?.description}
                    </div>

                    <div className="flex">
                        <Link href={{
                            pathname: '/watch/',
                            query: { movieId: randomMovie?.id },
                        }}>

                            <div onClick={() => { }} className="bg-[#ffffff] pt-2 pb-2 pl-6 pr-6 rounded mt-5 w-36 flex hover:cursor-pointer hover:bg-[#dddddd]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                                <p className="pl-4 font-medium">Play</p>
                            </div>
                        </Link>


                        <div onClick={() => { setModalMovie(randomMovie), setModal(true) }} className="bg-[#aaaaaa] bg-opacity-50 pt-2 pb-2 ml-6 pl-6 pr-6 rounded mt-5 w-60 flex hover:cursor-pointer text-white hover:bg-opacity-30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>

                            <p className="pl-4 font-medium">More Info</p>
                        </div>
                    </div>

                    <div className="mt-36 w-max">

                        <div className="absolute h-full w-max -mt-8" >
                            <p className="text-white text-xl w-max">Movie List</p>
                            <div className="flex -mt-3 ">
                                {

                                }
                                {movies.length > 0 ?

                                    (
                                        movies as MovieInterface[]).map((movie) => (
                                            <Card key={movie.id} data={movie} isFavorite={isFavorite(movie.id)} setModalMovie={setModalMovie} setModal={setModal} setFavoritList={setFavoritList} favoritList={favoritList}></Card>

                                        ))
                                    :
                                    <></>
                                }



                            </div>

                        </div>

                        <div className="absolute mt-60 h-full w-max" >
                            <p className="text-white text-xl ">Favorite List</p>
                            <div className="flex -mt-3">

                                {movies.length > 0 ?

                                    (movies as MovieInterface[]).map((movie) =>

                                    (
                                        isFavorite(movie.id) ?
                                            <Card key={movie.id} data={movie} isFavorite={isFavorite(movie.id)} setModalMovie={setModalMovie} setModal={setModal} setFavoritList={setFavoritList} favoritList={favoritList}></Card>
                                            :
                                            <></>

                                    )
                                    )
                                    :
                                    <></>
                                }


                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}