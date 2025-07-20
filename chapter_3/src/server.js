import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 5003

// Get file path from URL of current module
const __filename = fileURLToPath(import.meta.url)
// Get directory name from file path
const __dirname = dirname(__filename)

// Middleware
app.use(express.json())
// Serves HTML file from the /public directory
// Tells Express to serve all files from public folder as static assets/files
// Any request for the CSS files will be resolved to the public directory
app.use(express.static(path.join(__dirname, '../public')))

// Serving HTML file from the /public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)


app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})