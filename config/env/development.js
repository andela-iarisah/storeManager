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
		clientID: process.env.TWITTER_KEY || 'irQugdBwZQNeE7fXCGOMyeGd1',
		clientSecret: process.env.TWITTER_SECRET || 'hVKjCiByh0PuYswzydHVY6l0IkTuWVfCBwjJe2s17xGKzugqeg',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '303824372590-0bc1or9b1rsvm7o3lc1f6m60a8saj52a.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'EZQI7TdHzyURPsDxROY6J7tw',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
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