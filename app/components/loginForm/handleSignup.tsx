
type userData = {
    email: string
    password: string
}

export default function HandleSignup({email, password} : userData){
    return fetch(process.env.serverUrl + '/user/new',
    {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password})
    }).then((res) => 
    {
        return res.json()
        .then
        (
            (data) => { return data }
        )
    })


    
}