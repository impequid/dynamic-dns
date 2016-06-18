// import external

import crypto from 'crypto';

/**
 * @description creates a user session
 */
export function applyLogin (context, user) {
	context.session.impequidId = user.impequidId;
	context.session.impequidServer = user.impequidServer;
	context.session.id = user._id;
}

/**
 * @description logout
 */
export function removeLogin (context) {
	context.session = null;
	context.body = {
		success: true
	};
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
	if (context.session.impequidId) {
		return {
			valid: true,
			impequidId: context.session.impequidId,
			impequidServer: context.session.impequidServer,
			id: context.session.id
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
