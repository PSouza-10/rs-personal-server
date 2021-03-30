const consistsOfWhiteSpace = (str: string) =>
	str.split('').filter((char) => char !== ' ').length > 0

interface Param {
	[x: string]: any
}

export async function validateObject(obj: Param, fields: string[]) {
	fields.forEach((field) => {
		let fieldList = field.split('.')
		let val = { ...obj }
		for (let prop of fieldList) {
			val = val[prop]
		}

		if (typeof val === 'string') {
			if (consistsOfWhiteSpace(val) && val) {
				return
			} else {
				throw {
					id: 'INVALID_VALUE',
					msg: 'Por favor insira algo nos campos',
					field,
				}
			}
		} else return
	})
}
