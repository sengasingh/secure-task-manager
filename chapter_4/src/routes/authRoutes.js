import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

// Regiser a new user endpoint /auth/register
router.post('/register', async (req, res) => {
    const {username, password} = req.body
    // save username & irreversibly encrypted password

    // encrypt password
    const hashedPassword = bcrypt.hashSync(password, 8)
    console.log(hashedPassword)

    // save new user and hashed password to db
    try {
            const user = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword
                }
            })

            // add their first todo for them
            const defaultTodo = `Hello :) Add your first todo!`
            await prisma.todo.create({
                data: {
                    task: defaultTodo,
                    userId: user.id
                }
            })

            // create a token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
            res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login', async (req, res) => {
    // get email & look up password associated with email in database
    // but we get it back & see it's encrypted, which means we can't compare it what user entered
    // so what we do is again one-way encrypt the password the user entered

    const {username, password} = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        // if we can't find user associated with that username, return out of function
        if (!user) {return res.status(404).send({ message: "User not found" })}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if password doesn't match, return out of function
        if (!passwordIsValid) {return res.status(401).send({ message: "Invalid password" })}
        console.log(user)

        // then we have a successful authentication
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})

export default router 