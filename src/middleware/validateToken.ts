import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"

const validateToken = (req: Request, res: Response, next: NextFunction) => {
	// Söker efter en Authorization header
	const authHeader = req.headers["authorization"]

	// Authorization ser ut så här: Bearer tyut46786789iou <- lång token

	// LÄser ut JWT
	// Skriv kort vad det är
	const token = authHeader && authHeader.split(" ")[1]

	if (!token) {
		return res.status(401).json({ message: "Not authenticated" })
	}

	const secret = process.env.JWT_SECRET
	if (!secret) {
		throw Error("Missing JWT_SECRET")
	}
	// Kolla att JWTn är giltig

	jwt.verify(token, secret, (error, decodedPayload) => {
		if (error || !decodedPayload || typeof decodedPayload === "string") {
			return res.status(403).json({ message: "Not Authorized" })
		}

		if (!User.exists({ _id: decodedPayload.userId })) {
			return res.status(403).json({ message: "Not Authorized" })
		}

		req.userId = decodedPayload.userId
		next()
	})
	// Läsa ut användar-id från token
	// Lägga till userId på req
	//
}

export default validateToken
