interface MovieProps {
    url: string | undefined
    keyProp: string | undefined
}

export default function Movie({url, keyProp}:  MovieProps) {
    return (
        <div key={keyProp} className="rounded">
            <div className="from-[#1a1a1a] absolute top-10 h-full w-full bg-gradient-to-t  ">

            </div>
            <div className="bg-[#1a1a1a] absolute top-[312px] h-full w-full bg-gradient-to-t ">

            </div>
            <video autoPlay muted loop className=" w-full rounded-t-lg h-4/5 max-h-[600px]">
                <source src={url} type="video/mp4" />
            </video>
        </div>
    )
}