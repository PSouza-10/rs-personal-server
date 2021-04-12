import { Request, Response } from 'express'
import readFiles from '../utils/readFiles'

const readForms = async (type: "simple" | 'complete') => {
	let forms = {}
	await readFiles(
		'./src/forms/' + type ,
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
			switch(req.params.type){
				case "simple" :
				case "complete" :
					const forms = await readForms(req.params.type)
					return res.json(forms)
				default : throw new Error("invalid param")
			}
				
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
