// import external
import {isIP} from 'validator';

// import internal
import {Domain} from './models';
import config from '../config';
import {generateToken} from '../utilities';

// exported functions

/**
 * @description list all domains of a user
 */
export function list (options) {
	return new Promise((resolve, reject) => {
		Domain.find({
			user: options._id
		}, (error, domains) => {
			if (!error) {
				resolve(domains.map(domain => {
					return {
						name: domain.subdomain,
						token: domain.token
					};
				}));
			} else {
				console.error(error);
				reject('not found');
			}
		});
	});
}

/**
 * @description update a subdomain given the token
 */
export function update (token, ip) {
	return new Promise((resolve, reject) => {
		if (isIP(ip)) {
			Domain.find({
				token: token
			}, (error, domains) => {
				if (!error && domains.length === 1) {
					const domain = domains[0];
					setIP(domain.subdomain, ip).then(data => {
						resolve({
							domain: domain.subdomain
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
 * @description ads a new subdomain
 */
export function add (options) {
	return new Promise((resolve, reject) => {
		if (isIn(subdomain, config.excluded)) {
			Domain.find({
				user: options.user.id
			}, (err, domains) => {
				if (!err) {
					if (domains.length <= config.maxDomains) {
						const domain = new Domain({
							user: name,
							subdomain: options.subdomain,
							token: generateToken()
						});
						domain.save(error => {
							if (!error) {
								resolve(domain);
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

export function remove (options) {

	const {user, subdomain} = options;

	return new Promise((resolve, reject) => {
		Domain.findOne({
			user: options.user.id,
			subdomain: options.subdomain
		}, (err, domain) => {
			if (!err && domain !== null) {
				domain.remove();
				resolve('success');
			} else {
				reject('not found');
			}
		});
	});
}

export function newToken (options) {

	const {subdomain} = options;

	Domain.findOne({
		subdomain: subdomain
	}, (error, domain) => {
		if (!error) {
			domain.token = generateToken();
			domain.save();
			resolve('success');
		} else {
			reject('something went wrong');
		}
	});
}

const exported = {
	list,
	update,
	add,
	remove
};

export default exported;
