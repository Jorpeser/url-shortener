import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, NODE_ENV } from '../config.js'
import { isEmail } from '../util.js'
import { User } from '../models/User.model.js'

// [/] Function to handle user registration
/*  Registering takes email password and username 
    and creates a User DB item */
export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {

        // Check if username already exists
        const sameUsername = await User.findOne({
            username: username,
        })
        
        if (sameUsername) {
            throw new Error('Username already in use')
        }

        // Check if email already exists
        const sameEmail = await User.findOne({ email: email })
        if (sameEmail) {
            throw new Error('Email already in use')
        }

        // Check if password is valid
        if (!/(?=.*\d)(?=.*[A-Z]).{8,}/.test(password)) {
            throw new Error(
                'Password must be at least 8 characters long and contain at least one number and one capital letter'
            )
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10)

        const newUser = new User({
            email: email,
            password: hashedPassword,
            username: username,
            tier: 'free',
            urls: [],
        })

        await newUser.save()

        res.status(201).json(newUser)
    } catch (err) {
        console.log('Error en register: ' + err)
        res.status(400).json({ message: err.message })
    }
}

// [ ] Function to handle user login
export const login = async (req, res) => {
    // Extract email or username and password from request body
    const { emailOrUsername, password } = req.body

    try {
        let user

        // Validate the provided password
        if (!/(?=.*\d)(?=.*[A-Z]).{8,}/.test(password)) {
            throw new Error(
                'Password must be at least 8 characters long and contain at least one number and one capital letter'
            )
        }

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
            throw new Error('User not found')
        }

        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            throw new Error('Invalid password')
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
            secure: true, // NODE_ENV === 'production', // Only secure cookie in production
            sameSite: 'none', // SameSite policy
            credentials: 'include',
            maxAge: 1000 * 60 * 60, // 1 hour expiration time
        }).send({ user, token })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// [ ] Function to handle user logout
export const logout = async (req, res) => {
    res.clearCookie('auth_token').json({ message: 'Logged out' })
}

export const me = async (req, res) => {
    const token = req.cookies.auth_token

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
