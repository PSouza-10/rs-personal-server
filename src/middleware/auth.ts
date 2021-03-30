import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { User } from '../entity'

export async function auth(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization
	if (!token) {
		return res.status(403).send({})
	} else {
		try {
			const userId = (await jwt.verify(token, process.env.SECRET)) as string
			const UserRepository = getRepository(User)
			const user = await UserRepository.findOne(parseInt(userId))
			if (user) {
				req.locals = {}
				req.locals.user = user
				next()
			} else {
				return res.status(401).send()
			}
		} catch (e) {
			console.dir(e)
			return res.status(403).send({})
		}
	}
}
