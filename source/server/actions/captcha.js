// import internal

import constants from '../constants/captcha';
import dispatcher from '../dispatchers/captcha';

// actions

export default {
	verify (data) {
		return new Promise((resolve, reject) => {
			dispatcher.dispatch({
				type: constants.verify,
				data,
				resolve,
				reject
			});
		});
	},
	hydrate (data) {
		dispatcher.dispatch({
			type: constants.hydrate,
			data
		});
	},
	update (key) {
		dispatcher.dispatch({
			type: constants.update,
			value: key
		});
	},
	accept (event) {
		dispatcher.dispatch({
			type: constants.accept,
			value: event.target.checked
		});
	},
	submit () {
		dispatcher.dispatch({
			type: constants.submit
		});
	}
};
