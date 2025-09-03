import express from "express"
import { askToAssistant, getCurrentUser, updateAssistant } from "../controllers/user.controllers.js"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"

const userRouter = express.Router()


userRouter.get("/current",isAuth,getCurrentUser)  // from controller function 
userRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant)  // from controller function 
userRouter.post("/asktoassistant",isAuth,askToAssistant) 

export default userRouter