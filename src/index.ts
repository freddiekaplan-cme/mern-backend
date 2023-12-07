import express from "express"
import mongoose from "mongoose"

const app = express()

app.use("/", (req, res) => {
	console.log("Root route hit")

	res.send("Hello, world!")
})

mongoose.connect("mongodb://localhost:27017/changedit").then(() => {
	app.listen(3000, () => {
		console.log("Server listening on port 3000")
	})
})
// mongoose
// 	.connect("monogodb://root:example@localhost:27017/changedit")
// 	.then(() => {
// 		app.listen(3000, () => {
// 			console.log("Server listening on port 3000")
// 		})
// 	})
