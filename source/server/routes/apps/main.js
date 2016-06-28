// import internal

import actions from '../../actions';
import {getUser} from '../../utilities';

// routes

export default function * render () {

	const path = this.url;
	const user = getUser(this);

	if (user.valid && path === '/') { // redirect when already logged in
		this.redirect('/dashboard/domains');
	} else if (user.valid) {
		try {
			this.body = yield actions.render.main({
				path,
				user
			});
		} catch (error) {
			actions.error.couldNotRenderApp(this, error);
		}
	} else { // redirect when accessing logged-in-only resources
		if (['/'].indexOf(path) !== -1) {
			this.body = yield actions.render.main({
				path
			});
		} else this.redirect('/');
	}
}
