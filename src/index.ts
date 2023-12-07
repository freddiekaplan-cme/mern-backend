import "dotenv/config"
import express from "express"
import mongoose from "mongoose"

const app = express()

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
