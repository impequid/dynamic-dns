const defaultConfig = {
	"excluded": ["dns", "null", "undefined", "www"],
	"listen": {
		"address": "127.0.0.1",
		"port": 40000
	},
	maxDomains: 3,
	session: {
		"keys": [],
		duration: 86400 * 90
	},
	"reCaptcha": {
		"secret": "",
		"public": ""
	},
	"links": {
		"privacyPolicy": "https://github.com/dodekeract/impequid-dynamic-dns/tree/master/documentation/privacy-policy.md",
		"termsOfService": "https://github.com/dodekeract/impequid-dynamic-dns/tree/master/documentation/terms-of-service.md"
	},
	mongo: {
		url: 'mongodb://127.0.0.1/impequid-dynamic-dns',
		debug: false
	},
	server: {
		domain: 'example.domain',
		name: 'Impequid Dynamic DNS'
	},
	impequid: {
		defaultServer: 'impequid.com'
	}
};

let customConfig;

try {
	customConfig = require('../../config.json');
} catch (error) {
	console.error('could not load config.json');
	customConfig = {};
}

const config = Object.assign({}, defaultConfig, customConfig);

export default config;
