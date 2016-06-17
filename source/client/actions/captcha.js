import d from '../dispatchers/captcha';
import c from '../constants/captcha';

const actions = {
	hydrate (data) {
		d.dispatch({
			type: c.HYDRATE,
			data
		});
	},
	update (key) {
		d.dispatch({
			type: c.UPDATE,
			value: key
		});
	},
	accept (event) {
		d.dispatch({
			type: c.ACCEPT,
			value: event.target.checked
		});
	},
	submit () {
		d.dispatch({
			type: c.SUBMIT
		});
	}
};

export default actions;
