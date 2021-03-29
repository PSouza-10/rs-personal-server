import ConnectionString from 'pg-connection-string'

export function getProdDB() {
	const opts = ConnectionString.parse(process.env.DATABASE_URL)

	const { port, host, database, password, user } = opts
	console.log(opts)

	return {
		port: parseInt(port),
		host,
		password,
		username: user,
		database,
	}
}
