// import internal
import {User} from './models';

export function getUser (options) {
	return new Promise((resolve, reject) => {
		User.findOne({
			name: options.user,
			server: options.server
		}, (err, user) => {
			if (!err && user !== null) {
				resolve(user);
			} else {
				reject('not found');
			}
		});
	});
}

export function setUser (options) {
	return new Promise((resolve, reject) => {
		const user = new User({
			impequid: options.impequid
		});

		user.save(error => {
			if (!error) {
				resolve(user);
			} else {
				reject(error);
			}
		});
	});
}

const exported = {
	getUser,
	setUser
};

export default exported;
