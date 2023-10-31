

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export default async function Create() {
    const response = NextResponse.next()
    response.cookies.set('rtsyrwy', '987987897987987897')
    return response    
}