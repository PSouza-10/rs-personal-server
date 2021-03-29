import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { Admin } from '../entity/Admin'

export async function auth(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization
	if (!token) {
		return res.status(403).send({})
	} else {
		try {
			const userId = (await jwt.verify(token, process.env.SECRET)) as string
			const AdminRepository = getRepository(Admin)
			const admin = await AdminRepository.findOne(parseInt(userId))
			if (admin) {
				req.user = admin
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
