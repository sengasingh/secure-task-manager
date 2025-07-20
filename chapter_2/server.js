const express = require('express')
const app = express()
const PORT = 3000

let data = ['James']

// Middleware
app.use(express.json())

// ENDPOINT - HTTP VERBS (method) && Routes (or paths)
/* The method informs the nature of request and the route is a
   further subdirectory (basically we direct the request to a
   body of code that responds appropriately, and these locations or
   routes are called endpoints -> endpoint = method + route) */

// Type 1 - Website endpoints (for sending back HTML & they typically come when a user enters a URL)

app.get('/', (req, res) => {
    console.log('User requested the home page website')
    res.send(`
        <body style="background:pink;
        color: blue;">
            <h1>DATA:</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log('This is my script')</script>
        `)
})

app.get('/dashboard', (req, res) => {
    console.log('Ohhh now I hit the /dashboard endpoint')
    res.send(`
        <body>
            <h1>dashboard</h1>
            <a href="/">Homepage</a>    
        </body>`)
})

// Type 2 - API endpoints (non visual)

// CRUD -> create (post), read (get), update (put/patch), delete (delete)

app.get('/api/data', (req, res) => {
    console.log('This was for data')
    res.status(599).send(data)
})

app.post('/api/data', (req, res) => {
    // someone wants to create a new user (for ex. clicking sign up button)
    /* the user clicks button after entering credentials, browser sends a network
       request to the server to handle that action */
    const newEntry = req.body
    console.log(newEntry)
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.pop()
    console.log('We deleted last element of data array')
    res.sendStatus(203)
})

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))
// here