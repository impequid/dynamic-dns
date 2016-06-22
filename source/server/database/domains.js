// import external
import {isIP} from 'validator';

// import internal
import {Domain} from './models';
import config from '../config';
import {generateToken} from '../utilities';
import {setIP} from '../domains';

// helper functions

export function userifyDomain (domain) {
	const history = [];
	if (domain.history) {
		domain.history.forEach(item => {
			history.push({
				time: item.time,
				ip: item.ip
			});
		});
	}
	return {
		subdomain: domain.subdomain,
		token: domain.token,
		ip: domain.ip,
		user: domain.user,
		history
	}
}

// exported functions

/**
 * @description list all domains of a user
 */
export function list ({user}) {
	return new Promise((resolve, reject) => {
		Domain.find({
			user: user.id
		}, (error, domains) => {
			if (!error) {
				resolve(domains.map(domain => {
					return userifyDomain(domain);
				}));
			} else {
				console.error(error);
				reject('something went wrong');
			}
		});
	});
}

/**
 * @description update a subdomain given the token
 */
export function update ({token, ip}) {
	return new Promise((resolve, reject) => {

		// check if IP is valid

		if (isIP(ip)) {

			// find domain in database

			Domain.findOne({
				token: token
			}, (error, entry) => {
				if (!error && entry !== null) {

					// attempt to set IP

					setIP({
						subdomain: entry.subdomain,
						ip
					}).then(data => {
						// save IP to database
						entry.ip = ip;

						// add ip to history
						entry.history.push({
							ip
						});

						// limit history to 10
						if (entry.history.length >= 10) {
							entry.history.shift();
						}

						// save entry to database
						entry.save((error, data) => {
							if (!error) {
								resolve(userifyDomain(data));
							} else {
								reject('could not save ip');
							}
						});
					}).catch(error => {
						reject('could not update dns record');
					});
				} else {
					reject('not found');
				}
			});
		} else {
			reject('invalid ip');
		}
	});
}

/**
 * @description adds a new subdomain
 */
export function add ({user, subdomain}) {
	return new Promise((resolve, reject) => {
		if (config.excluded.indexOf(subdomain) === -1) {
			Domain.find({
				user: user.id
			}, (err, domains) => {
				if (!err) {

					// check subdomain limit

					if (domains.length < config.maxDomains) {
						const domain = new Domain({
							user: user.id,
							subdomain: subdomain,
							token: generateToken()
						});
						domain.save(error => {
							if (!error) {
								resolve(userifyDomain(domain));
							} else {
								console.error(error);
								reject('something went wrong');
							}
						});
					} else {
						reject('too many domains');
					}
				} else {
					reject('something went wrong');
				}
			});
		} else {
			reject('subdomain excluded');
		}
	});
}

export function remove ({token}) {
	return new Promise((resolve, reject) => {
		Domain.findOne({token}, (err, domain) => {
			if (!err && domain !== null) {
				domain.remove((error, data) => {
					if (!error) {
						resolve(userifyDomain(domain));
					} else {
						reject('could not delete');
					}
				});
			} else {
				reject('not found');
			}
		});
	});
}

export function newToken ({token}) {
	return new Promise((resolve, reject) => {
		Domain.findOne({
			token
		}, (error, domain) => {
			if (!error && domain !== null) {
				domain.token = generateToken();
				domain.save((error, data) => {
					if (!error) {
						resolve(domain);
					} else {
						reject('could not save');
					}
				});
			} else if (domain === null) {
				reject('token not found');
			} else {
				reject('something went wrong');
			}
		});
	})
}

const exported = {
	list,
	update,
	add,
	remove,
	newToken
};

export default exported;
