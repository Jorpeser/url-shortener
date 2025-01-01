"use server"

import bcrypt from 'bcryptjs'
import { isEmail } from "@/utils"
import { User } from '@/lib/models/User.model'
import { connectDB } from '../db'
import { NextResponse } from 'next/server'
import { createSession, deleteSession, verifySession } from '../session'

// [X] Function to handle user registration
export const register = async (data: any) => {
    try {
        const { email, password, username } = data

        await connectDB()

        // 1.- Check if username already exists
        const sameUsername = await User.findOne({
            username: username,
        })
        if (sameUsername) {
            return {
                message: 'Username already in use',
                status: 400
            }
        }

        // 2.- Check if email already exists
        const sameEmail = await User.findOne({ email: email })
        if (sameEmail) {
            return {
                message: 'Email already in use' ,
                status: 400 
            }
        }

        // 3.- Check if password is valid
        if (!/(?=.*\d)(?=.*[A-Z]).{8,}/.test(password)) {
            return {
                 message: 'Password must be at least 8 characters long and contain at least one number and one capital letter',
                 status: 400 
            }
        }

        // 4.- Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10)

        // 5.- Create the new user
        await User.create({
            email: email,
            password: hashedPassword,
            username: username,
            tier: 'free',
            urls: [],
        })

        // 6.- Send success response
        return {
            message: 'User registered successfully',
            status: 201 
        }

    } catch (err) {
        console.error('Error creating user: ' + err)
        return {
            message: 'Error creating user',
            status: 500
        }
    }
}

// [X] Function to handle user login
export const login = async (data: any) => {
    try {
        const { emailOrUsername, password } = data
        
        await connectDB()

        let user

        // 1.- Validate the provided email or username and find the user
        if (isEmail(emailOrUsername)) {
            user = await User.findOne({ email: emailOrUsername })
        } else {
            user = await User.findOne({ username: emailOrUsername })
        }

        // 2.- Check if the user exists
        if (!user) {
            return {
                message: 'Invalid user and password combination',
                status: 400
            }
        }

        // 3.- Compare the provided password with the hashed password in the user database item
        const validPassword = await bcrypt.compare(password, user?.password)
        if (!validPassword) {
            return {
                message: 'Invalid user and password combination',
                status: 400
            }
        }

        // 4.- We create a session for the user and set a cookie
        await createSession(user._id)

        // 5.- Send success response
        return {
            message: 'User logged in successfully',
            status: 200
        }

    } catch (err) {
        return {
            message: 'Error logging in',
            status: 500
        }
    }
}

// [ ] Function to handle user logout
export const logout = async () => {
    try {
        // 1.- Delete the session
        await deleteSession()

        // 2.- Send success response
        return {
            message: 'User logged out successfully',
            status: 200
        }

    } catch (err) {
        console.error('Error logging out: ' + err)
        return {
            message: 'Error logging out',
            status: 500
        }
    }
}

// [ ] Function to get the current user
export const me = async (req: Request, res: Response) => {

    // 1.- Verify if the user is logged in
    const session = await verifySession()
    if (!session || 'json' in session) {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        )
    }

    try {
        // 2.- Find the user in the database
        const user = await User.findById(session.userId).select('-password') // Excluir el campo de la contraseña
        
        // X.- Return error if user not found
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }

        // 3.- Send success response and return the user data
        return NextResponse.json(
            {
                id: user._id,
                username: user.username,
                tier: user.tier,
                urls: user.urls,
            },
            { status: 200 }
        )

    } catch (err) {
        console.error('Error getting user: ' + err)
        return NextResponse.json(
            { message: 'Error getting user' },
            { status: 500 }
        )
    }
}
