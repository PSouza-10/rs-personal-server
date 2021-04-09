import { Request, Response } from 'express'
import readFiles from '../utils/readFiles'

const readForms = async () => {
	let forms = {}
	await readFiles(
		'./src/forms',
		async (name, content) => {
			forms[name.replace('.json', '')] = JSON.parse(content)
		},
		async (err) => {
			console.error(err)
			throw err
		}
	)
	return forms
}
class FormController {
	async getForms(req: Request, res: Response) {
		try {
			const forms = await readForms()
			return res.json(forms)
		} catch (e) {
			return res.status(500).json({
				error: {
					_id: 'SERVER_ERROR',
					msg: 'Erro no servidor',
				},
			})
		}
	}
}

export default FormController
