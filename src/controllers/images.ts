import { Request, Response } from "express"
import mongoose from "mongoose"

export const getImage = (req: Request, res: Response) => {
	const dbConnection = mongoose.connection
	const bucket = new mongoose.mongo.GridFSBucket(dbConnection.db, {
		bucketName: "images",
	})

	const downloadStream = bucket.openDownloadStreamByName(req.params.fileName)

	downloadStream.on("data", (chunk) => {
		res.write(chunk)
	})

	downloadStream.on("error", () => {
		res.sendStatus(500)
	})

	downloadStream.on("end", () => {
		res.end()
	})
}
