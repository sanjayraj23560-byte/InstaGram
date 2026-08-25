import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import DB from './DB.js'
import router from './router/authRouter.js'
import authRoutes from './router/index.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Essential Middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json()) // Allows your server to parse JSON request bodies
DB()
// Test Route
app.use('/api', router);
app.get('/', (req, res) => {
    res.send('API successfully!')
})
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})