


export default function UpdateFavorites(userId: number, favoritList: string[]){
    
    //console.log('userId, favoritList', userId, favoritList)

    const resp = fetch(process.env.serverUrl + '/movie/updateFavorite', {
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({userId: userId, favoriteIds: favoritList}),
        method: 'Post'
    }).then((res) => {  })
}