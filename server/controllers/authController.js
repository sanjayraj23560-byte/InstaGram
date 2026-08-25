import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!username) return res.status(400).json({ Message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ Message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        })

        res.cookies('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'producation',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            userModel: { id: user._id, username: user.name },
            Message: 'Logged in successfully',
        })
    } catch (error) {
        console.log(error)
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Logout user / clear token cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Validate inputs
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both username and password',
            });
        }

        // 2. Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken',
            });
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create user in MongoDB
        const user = await User.create({
            username,
            password: hashedPassword,
        });

        // 5. Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        // 6. Set secure httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
        });

        // 7. Send Response
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};