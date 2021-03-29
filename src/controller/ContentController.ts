import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Published } from '../entity/Published'

class PostController {
	async get(req: Request, res: Response) {
		const postRepository = getRepository(Published)
		const posts = await postRepository.find({
			order: {
				updatedAt: 'DESC',
			},
			where: {
				public: true,
				requires_membership: false,
			},
		})

		return res.json({
			posts,
		})
	}

	async getOne(req: Request, res: Response) {
		const postRepository = getRepository(Published)
		try {
			const post = await postRepository.findOneOrFail(parseInt(req.params.id))
			return res.json(post)
		} catch (e) {
			if (e.name === 'EntityNotFound') {
				return res.status(404).json({
					error: {
						id: 'NOT_FOUND',
						msg: 'Recurso não encontrado',
					},
				})
			} else {
				return res.status(500).json({
					error: {
						id: 'SERVER_ERROR',
						msg: 'Ocorreu um erro ao buscar o recurso',
					},
				})
			}
		}
	}
}
export default PostController
