import express from "express"
import { Login, logOut, signUp } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post("/signup",signUp) // from controller function sign Up
authRouter.post("/signin",Login)  // from controller function sign In
authRouter.get("/logout",logOut)  // from controller function logOut

export default authRouter