import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { JWT_SECRET } from '../../config'
import { cache } from 'react'
import { NextResponse } from 'next/server'

const cookieName = 'auth_session'
const encodedJWTSecret = new TextEncoder().encode(JWT_SECRET)

export const encrypt = async (payload: any) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('6h')
        .sign(encodedJWTSecret)
}

export const decrypt = async (session: string | undefined = '') => {
    try {
        const { payload } = await jwtVerify(session, encodedJWTSecret, {
            algorithms: ['HS256']
        })
        return payload
    } catch (error) {
        console.error('Error decrypting session:', error)
        return null
    }
}

export const createSession = async (userId: string) => {
    const session = await encrypt({ userId })
    
    const cookiesStore = await cookies()
    cookiesStore.set(
        cookieName,
        session,
        {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 6, // 6 hours
            path: '/'
        }
    )
}

export const updateSession = async () => {
    const session = await cookies().get(cookieName)?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        console.error('Error updating session: session or payload not found')
        return null
    }

    const cookiesStore = await cookies()
    cookiesStore.set(
        cookieName,
        session,
        {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 6, // 6 hours
            path : '/'
        }
    )
}

export const deleteSession = async () => {
    const cookiesStore = await cookies()
    cookiesStore.delete(cookieName)
}

export const verifySession = cache(async () => {
    const cookiesStore = await cookies()
    const session = await cookiesStore.get(cookieName)?.value
    const payload = await decrypt(session)

    if (!payload?.userId) {
        return NextResponse.redirect('/login', 403)
    }

    return { isAuth: true, userId: payload.userId }
})
