// import internal

import config from '../config';
import domainDatabase from '../database/domains';

// templates

const mainTemplate = {
	server: {
		name: config.server.name,
		domain: config.domain,
		url: config.server.url,
		maxDomains: config.maxDomains
	},
	impequid: config.impequid
};

const captchaTemplate = {
	reCaptchaKey: config.reCaptcha.public,
	links: config.links,
	serverName: config.server.name
};

// functions

export async function main ({user}) {
	if (user) {
		const domains = await domainDatabase.list({user});
		return Object.assign({}, mainTemplate, {
			domains,
			user
		});
	} else return mainTemplate;
}

export function captcha ({server, impequidResponse}) {
	return Object.assign({}, captchaTemplate, {
		server,
		token: impequidResponse.token,
		user: impequidResponse.name
	});
}

// export

const exported = {
	main,
	captcha
};

export default exported;
