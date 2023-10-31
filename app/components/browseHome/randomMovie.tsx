import { MovieInterface } from "@/types";


export default function RandomMovie(movies?: MovieInterface[]){
    if(movies != null){
        return movies[Math.floor(Math.random() * movies.length)]
    }
    
}