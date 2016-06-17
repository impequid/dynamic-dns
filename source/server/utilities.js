// import external

import crypto from 'crypto';

/**
 * @description creates a user session
 */
export function applyLogin (context, user) {
	context.session.impequid = user.impequid;
	context.session.id = user._id;
}

/**
 * @description support nginx proxy and direct access
 */
export function getIP (context) {
	return context.headers['x-real-ip'] || context.ip;
}

/**
 * @description get login information from a session
 */
export function getUser (context) {
	if (context.session.impequid) {
		return {
			valid: true,
			id: context.session.impequid.id,
			server: context.session.impequid.server
		}
	} else {
		return {
			valid: false
		}
	}
}

/**
 * @description for login-only-routes
 */
export function loginify (context, callback) {
	const user = getUser(context);
	if (user.valid) {
		return callback(user);
	} else {
		context.status = 401;
		context.body = {
			error: 'unauthorized'
		};
		// TODO investigate this hack
		return [];
	}
}

/**
 * @description generates a random 128-bit token
 */
export function generateToken () {
	return crypto.randomBytes(16).toString('hex');
}
