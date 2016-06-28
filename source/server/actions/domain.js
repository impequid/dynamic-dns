// import internal

import domainDatabase from '../database/domains';
import oldDomains from '../domains';

// functions

export async function update ({token, ip}) {
	console.log(token, ip);
	return await domainDatabase.update({token, ip});
}

export async function list ({user}) {
	return await domainDatabase.list({user});
}

export async function refreshToken ({token}) {
	return await domainDatabase.newToken({token});
}

export async function remove ({token}) {
	const {subdomain} = await domainDatabase.remove({token});
	await oldDomains.remove({
		subdomain
	});
}

export async function add ({user, subdomain}) {
	console.log(`${user.impequidId}@${user.impequidServer} trying to add ${subdomain}`);
	return await domainDatabase.add({user, subdomain});
}

// export

const exported = {
	update,
	list,
	remove,
	add,
	refreshToken
};

export default exported;
