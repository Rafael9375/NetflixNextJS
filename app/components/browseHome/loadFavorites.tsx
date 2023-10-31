export default async function LoadFavorites(idUser: number){
    
    const allMovies = await fetch(process.env.serverUrl + '/movie/getFavorites', {
        method: 'POST',
        headers: {'Content-type':'application/Json'},
        body: JSON.stringify({idUser:idUser})
    })

    let movies

    if(allMovies.ok){
        movies = await allMovies.json();
        return movies
    }
    
    return null
}