import express from "express"
import multer from "multer"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import csrf from "csurf"
import cors from "cors"
import dotenv from "dotenv"
import { database } from "./persistent-database.js" // or use "./in-memory-database.js"
import path from "path"

const router = express.Router() // Create a router

/**
 * Mount Middleware
 */

// Public files, form data, JSON, CSRF protection, and CORS
router.use(express.static("public"))
router.use(express.static("uploads"))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.json())
router.use(cookieParser())
const csrfProtection = csrf({ cookie: true })
router.use(
  cors({
    origin: true, // Allows any origin
    credentials: true,
  })
)

// Configure for multi-part, form-based file uploads
const upload = multer({ dest: "uploads/" })

// configure for handling credentials stored in .env
dotenv.config()

/**
 * Route Definitions
 */

// Home route
router.get("/", async (req, res) => {
  try {
    const users = await database.getUsers()
    res.render("home", { users })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// Users route
router.get("/users", async (req, res) => {
  try {
    const users = await database.getUsers()
    res.render("users", { users })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// Signup route
router.get("/signup", csrfProtection, async (req, res) => {
  const csrfToken = req.csrfToken()
  try {
    const users = await database.getUsers()
    res.render("signup", { csrfToken, users })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// Create user route
router.post(
  "/users/create",
  upload.single("avatar"),
  csrfProtection,
  async (req, res) => {
    let fileName = null
    if (req.file) {
      const ext = path.extname(req.file.originalname)
      fileName = `${req.file.filename}${ext}`
      const fs = await import("fs/promises")
      await fs.rename(req.file.path, path.join(req.file.destination, fileName))
    }
    const userData = {
      ...req.body,
      portrait_img: fileName,
    }
    try {
      await database.addUser(userData)
      res.redirect("/users")
    } catch (error) {
      console.error(error)
      res.status(500).send("Internal Server Error")
    }
  }
)

// Delete user route
router.post("/users/delete/:id", async (req, res) => {
  try {
    await database.removeUser(req.params.id)
    res.redirect("/users")
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// Favorite user route
router.post("/users/favorite/:id", async (req, res) => {
  try {
    await database.favoriteUser(req.params.id)
    res.redirect("/users")
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// Route for CSRF token (when needed)
router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

export default router
