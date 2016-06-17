// import external

import {default as CloudFlare, DNSRecord} from 'cloudflare';
import {isIP} from 'validator';

// import internal

import config from './config';

// setup cloudflare

let cloudflare, zoneID;

export function initialize () {
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

export function setIP (subdomain, ip) {
	return new Promise((resolve, reject) => {
		cloudflare.browseDNS(zoneID, {
			name: `${subdomain}.${config.domain}`
		}).then((dns) => {
			var found = false;
			dns.result.forEach((record) => {
				if (record.name === `${subdomain}.${config.domain}` && !found) {
					found = true;
					record.content = ip;
					record.type = isIP(ip, 4) ? 'A' : 'AAAA';
					cloudflare.editDNS(record).then((data) => {
						resolve(data);
					}).catch((error) => {
						console.error(error);
						reject(error);
					});
				}
			});
			if (!found) {
				var record = createRecord(subdomain, ip);
				cloudflare.addDNS(record).then((data) => {
					console.log(`registered new subdomain ${data.name}`);
					resolve(data);
				}).catch((error) => {
					console.error(error);
					reject(error);
				});
			}
		}).catch((error) => {
			console.error(error);
			reject(error);
		});
	});
}

// export

const exported = {
	initialize,
	setIP
};

export default exported;
