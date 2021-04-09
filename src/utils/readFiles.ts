import fs from 'fs'
import path from 'path'
type TOnfileCOntent = (filename: string, content: string) => any
type TOnfileError = (err: NodeJS.ErrnoException) => any

export default async function readFiles(
	dirname: string,
	onFileContent: TOnfileCOntent,
	onError: TOnfileError
) {
	const files = fs.readdirSync(dirname, 'utf-8')

	files.forEach(function (filename) {
		const content = fs.readFileSync(
			path.resolve(dirname + '/' + filename),
			'utf-8'
		)

		onFileContent(filename, content)
	})
	return
}
