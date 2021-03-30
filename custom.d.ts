declare namespace Express {
	export interface Request {
		locals: {
			[x: string]: any
		}
	}
}
