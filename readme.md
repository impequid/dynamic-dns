# Impequid Dynamic DNS

> A simple CloudFlare-based dynamic DNS server, uses [Impequid](https://github.com/dodekeract/impequid) for authentication.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Code Climate](https://codeclimate.com/github/impequid/dynamic-dns/badges/gpa.svg)](https://codeclimate.com/github/impequid/dynamic-dns)
[![NPM Downloads](https://img.shields.io/npm/dm/impequid-dynamic-dns.svg)](https://npmjs.com/package/impequid-dynamic-dns)
[![NPM Dependencies](https://david-dm.org/impequid/dynamic-dns.svg)](https://david-dm.org/impequid/dynamic-dns)
[![Slack Chatroom](https://slack.dodekeract.com/badge.svg)](https://slack.dodekeract.com)

## Installation

- Install [Node.js](https://nodejs.org)
- Install [MongoDB](https://mongodb.org)
- `git clone https://github.com/dodekeract/impequid-dynamic-dns`
- `cd impequid-dynamic-dns`
- `npm install`
- `npm run build`
- `npm run start`

## Configuration

Currently, you have to add a `config.json` file to the `dynamic-dns` directory.

<details>
<summary>Example</summary>

````json
{
	"cloudflare": {
		"email": "your@cloudflare.email",
		"token": "y0uRc7oUdF74r3T0k3n"
	},
	"domain": "your.domain",
	"excluded": ["list", "of", "subdomains", "you", "dont", "want", "to", "allow"],
	"listen": {
		"port": 40000,
		"address": "127.0.0.1"
	}
}
````
</details>

## API

See [here](documentation/api.md)
