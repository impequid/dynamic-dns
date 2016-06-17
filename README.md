# Impequid DynDNS

A simple CloudFlare-based dynamic DNS server.

## Installation

- Install [Node.js](https://nodejs.org)
- `npm install impequid-dyndns -g`

## Dependencies

- This project needs a MongoDB database to store the user accounts and domain names.

## Configuration

You need to create a folder for `impequid-dyndns`.  
It's recommended to use `/etc/impequid-dyndns/` with `chown impequid-dyndns:impequid-dyndns` and `chmod 700`, so nobody can get your CloudFlare token.  
This folder also needs a `config.json`:

````json
{
	"cloudflare": {
		"email": "your@cloudflare.email",
		"token": "y0uRc7oUdF74r3T0k3n"
	},
	"domain": "your.domain",
	"excluded": ["list", "of", "subdomains", "you", "dont", "want", "to", "allow"],
	"port": 80,
	"listen": "0.0.0.0"
}
````

`port` and `listen` are optional and default to the above values.

## Usage

To start the server, just run `impequid-dyndns` after creating a config file.

If you chose a different folder than `/etc/impequid-dyndns`, use `impequid-dyndns --folder /path/to/folder`.

## API

### Update DNS

- `GET /update/:token` → update ip (use this on your router/server!)

### Domains

- `GET /domains` → domain list
- `PUT /domains` → add domain
- `POST /domains` → new token for domain
- `DELETE /domains` → remove domain

### Login

- `GET /login` → shows user data
- `PUT /login` → logs user in
- `POST /login` → creates new user
- `DELETE /login` → logs user out
