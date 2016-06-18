// import internal
import {User} from './models';

export function getUser ({impequidId, impequidServer}) {
	return new Promise((resolve, reject) => {
		User.findOne({
			impequidId,
			impequidServer
		}, (err, user) => {
			if (!err && user !== null) {
				resolve(user);
			} else {
				reject('not found');
			}
		});
	});
}

export function setUser ({impequidId, impequidServer, impequidToken}) {

	return new Promise((resolve, reject) => {
		const user = new User({
			impequidId,
			impequidServer,
			impequidToken
		});

		user.save(error => {
			if (!error) {
				resolve(user);
			} else {
				User.findOne({
					impequidId,
					impequidServer
				}, (error, doc) => {
					if (!error && doc !== null) {

						// update token
						doc.impequidToken = impequidToken;
						doc.save((error, data) => {
							if (!error) {
								resolve(data);
							} else {
								reject(error);
							}
						});
					} else {
						reject(error);
					}
				});
			}
		});
	});
}

const exported = {
	getUser,
	setUser
};

export default exported;
