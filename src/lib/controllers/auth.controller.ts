import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../../config'
import { isEmail } from '../../utils'
import { User } from '@/lib/models/User.model'
import { connectDB } from '../db'
import { NextResponse } from 'next/server'

// [/] Function to handle user registration
/*  Registering takes email password and username 
    and creates a User DB item */
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = await req.json()

        await connectDB()

        // Check if username already exists
        const sameUsername = await User.findOne({
            username: username,
        })
        if (sameUsername) {
            return NextResponse.json(
                { message: 'Username already in use' },
                { status: 400 }
            )
        }

        // Check if email already exists
        const sameEmail = await User.findOne({ email: email })
        if (sameEmail) {
            return NextResponse.json(
                { message: 'Email already in use' },
                { status: 400 }
            )
        }

        // Check if password is valid
        if (!/(?=.*\d)(?=.*[A-Z]).{8,}/.test(password)) {
            return NextResponse.json(
                { message: 'Password must be at least 8 characters long and contain at least one number and one capital letter'},
                { status: 400 }
            )
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10)

        // Create a new user
        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            username: username,
            tier: 'free',
            urls: [],
        })

        return NextResponse.json(
            { message: 'User registered successfully'},
            { status: 201 }
        )
    } catch (err) {
        console.error('Error creating user: ' + err)
        return NextResponse.json(
            { message: 'Error creating user' },
            { status: 500 }
        )
    }
}

// [ ] Function to handle user login
export const login = async (req: Request, res: Response) => {
    try {
    
        const { emailOrUsername, password } = await req.json()
        
        await connectDB()

        let user

        // Validate the provided email or username and find the user
        if (isEmail(emailOrUsername)) {
            user = await User.findOne({ email: emailOrUsername })
            console.log("Login con email: ", user)
        } else {
            user = await User.findOne({ username: emailOrUsername })
            console.log("Login con username: ", user)
        }

        // Check if the user exists
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid user and password combination' },
                { status: 400 }
            )
        }

        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user?.password)
        if (!validPassword) {
            return NextResponse.json(
                { message: 'Invalid user and password combination' },
                { status: 400 }
            )
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username }, // JWT payload
            JWT_SECRET, // Secret key
            { expiresIn: '1h' }
        )

        // Set the token as a cookie and send the response
        res.cookie('auth_token', token, {
            httpOnly: true, // Prevents client-side access to the cookie
            secure: false, // NODE_ENV === 'production', // Only secure cookie in production
            sameSite: 'none', // SameSite policy
            credentials: 'include',
            maxAge: 1000 * 60 * 60, // 1 hour expiration time
        }).send({ user, token })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// [ ] Function to handle user logout
export const logout = async (req: Request, res: Response) => {
    res.clearCookie('auth_token').json({ message: 'Logged out' })
}

export const me = async (req: Request, res: Response) => {
    const token = req.cookies.auth_token
    console.log("Token: ", token)
    //console.log("Request: ", req)
    console.log("Cookies: ", req.cookies)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.id).select('-password') // Excluir el campo de la contraseña
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            tier: user.tier,
            urls: user.urls,
            // Agrega cualquier otra información relevante del usuario
        })
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' })
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' })
        }
        res.status(500).json({ message: 'Internal server error' })
    }
}
