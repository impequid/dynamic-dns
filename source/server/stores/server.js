// import external

import reCaptchaValidator from 'recaptcha-validator';

// import internal

import Store from '../utilities/store';
import dispatchers from '../dispatchers';
import constants from '../constants';
import actions from '../actions';
import config from '../config';

// store

const _state = {};

class ServerStore extends Store {
	constructor () {
		super();
	}

	getState () {
		return _state;
	}
}

const store = new ServerStore();

function handleAction (action) {
	console.info('server-store', action.type);

	const {type, data, reject, resolve} = action;

	switch (type) {
		case constants.captcha.verify:
			const {captcha, ip} = data;
			reCaptchaValidator.promise(config.reCaptcha.secret, captcha, ip).then(resolve).catch(reject);
		break;
	}

	store.emitChange();
}

dispatchers.captcha.register(handleAction);

export default store;
