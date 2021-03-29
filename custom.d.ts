declare namespace Express {
	export interface Request {
		user?: {
			id: number
			username: string
			content_access: any[]
			password: string
		}
	}
}
