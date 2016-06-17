import d from '../dispatchers/main';
import c from '../constants/main';

const actions = {
	hydrate (data) {
		d.dispatch({
			type: c.HYDRATE,
			data
		});
	}
}

export default actions;
