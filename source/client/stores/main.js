// classes
import Store from '../utilities/store';

// instances
import dispatcher from '../dispatchers/main';
import constants from '../constants/main';
import actions from '../actions/main';

const _state = {};

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
	console.info('store', action.type);

	switch (action.type) {
		case constants.HYDRATE:
			_state.impequid = action.data.impequid;
			_state.serverName = action.data.serverName;
			_state.domain = action.data.domain;
		break;
	}

	store.emitChange();
});

export default store;
