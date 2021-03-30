import { getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { User } from '../entity/User'
import { validateObject } from '../utils/validateObject'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Mail from 'nodemailer/lib/mailer'
interface WithUserInfo extends Request {
	body: User
}
import * as mails from '../mails'
import { sendMail } from '../services/mailer'
class UserController {
	async register(req: WithUserInfo, res: Response, next: NextFunction) {
		const users = getRepository(User)
		try {
			await validateObject(req.body, [
				'firstName',
				'lastName',
				'email',
				'password',
			])

			const userExists = await users.findOne({
				where: {
					email: req.body.email,
				},
			})

			if (userExists) {
				throw {
					id: 'USER_ALREADY_REGISTERED',
					msg: 'O usuário com o email enviado já foi cadastrado',
				}
			}
			let user = {
				...req.body,
			}
			user.password = await bcrypt.hash(req.body.password, 10)

			let { password, ...newUser } = await users.save(user)

			const token = await jwt.sign(newUser.id.toString(), process.env.SECRET)

			req.locals = {}
			req.locals.data = {
				token,
				user: newUser,
			}

			next()
		} catch (e) {
			console.error(e)
			if (e.id === 'INVALID_VALUE') {
				return res.status(400).json({
					error: {
						id: 'INVALID FIELD',
						msg: 'Por favor preencha os campos obrigatórios',
					},
				})
			}

			if (e.id) {
				return res.status(400).json({ error: e })
			}
			return res.status(500).json({
				error: {
					id: 'SERVER_ERROR',
					msg: 'Ocorreu um erro ao cadastrar o usuário',
				},
			})
		}
	}
	async sendConfirmationEmail(req: Request, res: Response) {
		const { user, token } = req.locals.data

		const msg: Mail.Options = {
			from: 'rspersonal@gmail.com',
			to: user.email,
			subject: 'Confirmação de email',
			html: mails.confirmEmail(user, token),
		}

		await sendMail(msg)
		return res.json(req.locals.data)
	}
	async confirmEmail(req: Request, res: Response) {
		const token = req.params.token
		const users = getRepository(User)
		try {
			const id = jwt.verify(token, process.env.SECRET) as string
			const user = await users.findOneOrFail(parseInt(id))
			await users.save({
				...user,
				emailVerified: true,
			})
			return res.redirect('http://localhost:3000')
		} catch (e) {
			return res.send('Erro ao verificar o email')
		}
	}
	async login(req: Request, res: Response) {
		const users = getRepository(User)
		try {
			const { password, ...user } = await users.findOneOrFail({
				where: {
					email: req.body.email,
				},
			})

			const passwordMatch = await bcrypt.compare(req.body.password, password)

			if (passwordMatch) {
				const token = jwt.sign(user.id.toString(), process.env.SECRET)

				return res.json({
					token,
					user,
				})
			} else throw new Error()
		} catch (e) {
			return res.status(400).json({
				error: {
					id: 'NO_MATCH',
					msg: 'O usuário ou senha enviados estão incorretos',
				},
			})
		}
	}
	async refresh(req: Request, res: Response) {
		const { password, ...user } = req.locals.user
		return res.json(user)
	}
}

export default UserController
