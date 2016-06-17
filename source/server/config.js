const defaultConfig = {
	"excluded": ["dns"],
	listenAddress: '0.0.0.0',
	port: 44400,
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
		"privacyPolicy": "https://github.com/dodekeract/impequid-dyndns/tree/master/documentation/privacy-policy.md",
		"termsOfService": "https://github.com/dodekeract/impequid-dyndns/tree/master/documentation/terms-of-service.md"
	},
	mongo: {
		url: 'mongodb://localhost/impequid-dyndns'
	},
	server: {
		url: 'unknown.url',
		name: 'Impequid DynDNS'
	},
	impequid: {
		defaultServer: 'dodekeract.smartfl.at:8080'
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
