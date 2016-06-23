// import external

import {default as CloudFlare, DNSRecord} from 'cloudflare';
import {isIP} from 'validator';

// import internal

import config from './config';

// setup cloudflare

let cloudflare, zoneID;

function initialize () {
	cloudflare = new CloudFlare({
		email: config.cloudflare.email,
		key: config.cloudflare.token
	});

	// fetch zoneID

	cloudflare.browseZones({
		name: config.domain
	}).then((zones) => {
		zones.result.forEach((zone) => {
			if (zone.name === config.domain) {
				zoneID = zone.id;
				console.log(`zone id found for ${zone.name}: ${zone.id}`);
			}
		});
	}).catch((error) => {
		console.log(error);
	});
}
initialize();

// helper functions

function createRecord (subdomain, ip) {
	return DNSRecord.create({
		name: `${subdomain}.${config.domain}`,
		zone_id: zoneID,
		type: isIP(ip, 4) ? 'A' : 'AAAA',
		content: ip
	});
};

/**
 * @description set subdomain entry IP
 */
export function setIP ({subdomain, ip}) {
	return new Promise((resolve, reject) => {
		cloudflare.browseDNS(zoneID, {
			name: `${subdomain}.${config.domain}`
		}).then(dns => {
			if (dns.result.length) {
				const record = dns.result[0];

				record.content = ip;
				record.type = isIP(ip, 4) ? 'A' : 'AAAA';
				cloudflare.editDNS(record).then(resolve).catch(reject);
			} else {
				const record = createRecord(subdomain, ip);
				cloudflare.addDNS(record).then((data) => {
					console.log(`registered new subdomain ${data.name}`);
					resolve(data);
				}).catch(reject);
			}
		}).catch(reject);
	});
}

/**
 * @description remove subdomain entry from cloudflare
 */
export function remove ({subdomain}) {
	return new Promise((resolve, reject) => {
		cloudflare.browseDNS(zoneID, {
			name: `${subdomain}.${config.domain}`
		}).then(dns => {
			if (dns.result.length) {
				const record = dns.result[0];
				cloudflare.deleteDNS(record).then(data => {
					resolve('success');
				}).catch(error => {
					reject('could not delete entry from cloudflare');
				});
			} else {
				resolve('didn\'t exist');
			}
		}).catch(error => {
			reject('could not search dns record');
		});
	});
}

// export

const exported = {
	setIP,
	remove
};

export default exported;
