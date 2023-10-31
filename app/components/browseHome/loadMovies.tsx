import { MovieInterface } from "@/types";


interface loadMoviesParam {
    userId: number,
    movieId: number
}

export default function LoadMovies(dataParam?: loadMoviesParam) {
    


    let movies
    if(!dataParam?.userId && !dataParam?.movieId){
        console.log('vou por aqui')
        return fetch(process.env.serverUrl + '/movie/all', {
            method: 'GET',
            headers: {'Content-type':'application/Json'}
            
        })
        .then((response) => {
            
            return response.json().then((data) => {return data})
        })
        
        
        
        
    }
    if(dataParam?.movieId){
        return fetch(process.env.serverUrl + '/movie/getbyid?id=' + dataParam.movieId, {
            method: 'GET',
            headers: {'Content-type':'application/Json'},
            
            
        })
        .then(x =>  {return x.json()})
        .then(data => {return data})
        
        
    }

}