import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import User from "./models/User"

const app = express()

app.use(express.json())

app.post("/register", async (req, res) => {
	//body kommer från Express
	const { username, password } = req.body

	const user = new User({ userName: username, password })
	await user.save()

	res.send({ username, id: user._id })
})

app.use("/", (req, res) => {
	console.log("Root route hit")

	res.send("Hello, world!")
})

const mongoURL = process.env.DB_URL

if (!mongoURL) throw Error("Missing db url")

mongoose.connect(mongoURL).then(() => {
	const port = parseInt(process.env.PORT || "3000")
	app.listen(port, () => {
		console.log(`Server listening on port ${port}`)
	})
})
