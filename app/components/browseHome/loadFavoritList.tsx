export default function LoadFavoritList(userId: number){
    return fetch(process.env.serverUrl + '/movie/getFavoritList', {
        body: JSON.stringify({userId: userId}),
        method: 'POST',
        headers: {'Content-Type':'application/json'}
    }).then((res) => {return res.json().then((result) => {return result})})
    
}