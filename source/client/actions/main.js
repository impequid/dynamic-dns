import d from '../dispatchers/main';
import c from '../constants/main';

const actions = {
	hydrate (data) {
		d.dispatch({
			type: c.HYDRATE,
			data
		});
	},
	logout (event) {
		event.preventDefault();
		d.dispatch({
			type: c.LOGOUT
		});
	},
	updateAddSubdomain (event) {
		event.preventDefault();
		d.dispatch({
			type: c.UPDATE_ADD_SUBDOMAIN,
			data: event.target.value
		});
	},
	addSubdomain (event) {
		event.preventDefault();
		event.stopPropagation();
		d.dispatch({
			type: c.ADD_SUBDOMAIN
		});
	},
	updateSubdomains () {
		d.dispatch({
			type: c.UPDATE_SUBDOMAINS
		});
	},
	updateSubdomainToken (event) {
		event.preventDefault();
		d.dispatch({
			type: c.UPDATE_SUBDOMAIN_TOKEN,
			data: this
		});
	},
	removeSubdomain (event) {
		event.preventDefault();
		d.dispatch({
			type: c.REMOVE_SUBDOMAIN,
			data: this
		});
	}
}

export default actions;
