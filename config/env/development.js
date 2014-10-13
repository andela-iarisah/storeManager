'use strict';

module.exports = {
	db: 'mongodb://localhost/item-dev',
	app: {
		title: 'Item - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1488179444777107',
		clientSecret: process.env.FACEBOOK_SECRET || '9e04619506db7018b13456e1be411116',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'DLATsjwYFoH1BEL7tcPEXZXQT',
		clientSecret: process.env.TWITTER_SECRET || '28fW4lRhtZylX2XKUhQbH7P7V3X99r1c3N8lYSb5qe6clqaByg',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};