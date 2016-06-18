// import external
import request from 'superagent';
import {navigate} from 'react-mini-router';

// classes
import Store from '../utilities/store';

// instances
import dispatcher from '../dispatchers/main';
import constants from '../constants/main';
import actions from '../actions/main';

const _state = {
	addSubdomain: ''
};

class MainStore extends Store {
	constructor () {
		super();
	}

	getState () {
		return _state;
	}
}

const store = new MainStore();

store.dispatchToken = dispatcher.register(action => {
	console.info('main-store', action.type);

	switch (action.type) {
		case constants.HYDRATE:
			_state.impequid = action.data.impequid;
			_state.server = action.data.server;
			_state.user = Object.assign({
				valid: false,
				id: '',
				server: ''
			}, action.data.user);
			_state.domains = action.data.domains || [];
		break;
		case constants.UPDATE_ADD_SUBDOMAIN:
			_state.addSubdomain = action.data;
		break;
		case constants.ADD_SUBDOMAIN:
			request
				.put('/api/domain/')
				.send({
					subdomain: _state.addSubdomain
				})
				.end((error, response) => {
					if (!error) {
						actions.updateSubdomains();
						console.info(response);
					} else {
						console.error(error, response.body);
					}
				});
		break;
		case constants.REMOVE_SUBDOMAIN:
			request
				.delete(`/api/domain/${action.data}`)
				.end((error, response) => {
					if (!error) {
						actions.updateSubdomains();
						console.info(response);
					} else {
						console.error(error, response.body);
					}
				});
		break;
		case constants.UPDATE_SUBDOMAINS:
			request
				.get('/api/domains/')
				.end((error, response) => {
					if (!error) {
						_state.domains = response.body;
						store.emitChange();
					} else {
						console.error(error, response.body);
					}
				});
		break;
		case constants.UPDATE_SUBDOMAIN_TOKEN:
			request
				.post(`/api/domain/${action.data}`)
				.end((error, response) => {
					if (!error) {
						actions.updateSubdomains();
						console.info(response);
					} else {
						console.error(error, response.body);
					}
				});
		break;
		case constants.LOGOUT:
			request
				.del('/api/authenticate/')
				.end((error, response) => {
					if (!error) {
						_state.user = {
							valid: false,
							id: '',
							server: ''
						};
						navigate('/');
						store.emitChange();
					} else {
						console.error(error, response.body);
					}
				});
		break;
	}

	store.emitChange();
});

export default store;
