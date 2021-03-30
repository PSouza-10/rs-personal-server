import mailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export const sendMail = async (opts: Mail.Options) => {
	mailer.createTestAccount((err, account) => {
		if (err) {
			console.error('Failed to create test account')
			return
		}

		let transporter = mailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		})

		transporter.sendMail(opts, (err, info) => {
			if (err) {
				console.error('Error on sending email')
				console.error(err)
				return
			}
			console.log(
				'Email ' +
					opts.subject +
					' enviado para o endereço' +
					opts.to +
					' ID:' +
					info.messageId
			)
			console.log('Veja o email aqui: ' + mailer.getTestMessageUrl(info))
		})
	})
}
