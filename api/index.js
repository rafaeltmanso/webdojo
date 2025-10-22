const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient')
require('dotenv').config()

const app = express()
const port = 3333

app.use(express.json())
app.use(cors())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format.' })
  }
  next(err)
})

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name) return res.status(400).json({ error: 'Name is required!' })
  if (!email) return res.status(400).json({ error: 'Email is required!' })
  if (!password) return res.status(400).json({ error: 'Password is required!' })

  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered!' })
    }

    // Create user
    const newUser = await prisma.user.create({
      data: { name, email, password },
    })

    return res.status(201).json({
      message: 'User registered successfully!',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Error registering user!' })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, password: false },
    })
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error fetching users!' })
  }
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, email: true, password: false },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found!' })
    }

    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error fetching user!' })
  }
})

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body

  try {
    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
      },
    })

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Error updating user :(' })
  }
})

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found!' })
    }

    await prisma.user.delete({
      where: { id: Number(id) },
    })

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user :(' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
