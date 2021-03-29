import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import Routes from './routes'
import cors from 'cors'
import { getProdDB } from './prodDB'
import { Admin, User, Post, Published, Comment } from './entity'
const isProduction = process.env.NODE_ENV === 'production'

interface IApp {
	express: express.Express

	middleware: () => void
	routes: () => void
	database: () => void
}

class App implements IApp {
	express: express.Express

	constructor() {
		this.database()
		this.express = express()
		this.middleware()
		this.routes()
	}

	async database() {
		;(isProduction
			? createConnection({
					type: 'postgres',
					synchronize: true,
					entities: [Admin, User, Published, Post, Comment],
					migrations: ['migration/**/*{.ts,.js}'],
					extra: {
						ssl: {
							rejectUnauthorized: false,
						},
					},

					...getProdDB(),
			  })
			: createConnection()
		)
			.then(async (conn) => {
				console.log('Postgres Connected')
				console.log(conn.options)
			})
			.catch((error) => console.log(error))
	}
	async middleware() {
		this.express.use(express.json({ limit: '50mb' }))
		this.express.use(
			cors({
				origin: '*',
			})
		)
	}
	async routes() {
		this.express.use('/', Routes)

		console.log('Routes initialized')
	}
}
const app = new App()
export default app.express
