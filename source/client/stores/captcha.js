// import external
import request from 'superagent';

// utilities
import Store from '../utilities/store';

// instances
import dispatcher from '../dispatchers/captcha';
import constants from '../constants/captcha';
import actions from '../actions/captcha';

const _state = {
	user: '',
	server: '',
	captcha: '',
	accepted: false,
	reCaptchaKey: ''
};

class storeStore extends Store {

	getState () {
		return _state;
	}

}

const store = new storeStore();

dispatcher.register(action => {
	console.info('captcha-store', action.type);

	switch (action.type) {
		case constants.HYDRATE:
			_state.user = action.data.user;
			_state.token = action.data.token;
			_state.server = action.data.server;
			_state.reCaptchaKey = action.data.reCaptchaKey;
			_state.serverName = action.data.serverName;
			_state.links = action.data.links;
		break;
		case constants.SUBMIT:
			request
				.post('/api/authenticate/finish')
				.send({
					server: _state.server,
					token: _state.token,
					captcha: _state.captcha
				})
				.end((error, response) => {
					if (!error) {
						console.log(response);
						if (response.statusCode === 200) {
							console.log('redirecting');
							location.pathname = '/dashboard';
						}
					} else {
						console.error(error);
					}
				});
		break;
		case constants.UPDATE:
			_state.captcha = action.value;
		break;
		case constants.ACCEPT:
			_state.accepted = action.value;
		break;
	}

	store.emitChange();
});

export default store;
