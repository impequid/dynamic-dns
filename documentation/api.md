# Impequid Dynamic DNS API

## Update DNS

These simple HTTP calls allow you to update the DNS entry to the requesting IP.

- `GET /api/update/:token` → update ip (use this on your router/server!)
- `GET /api/update/:token/:ip` → force set IP (not implemented yet)

## Domains

Used for managing the subdomains.

- `GET /api/domains` → domain list
- `PUT /api/domain` → add domain
- `POST /api/domain/:token` → new token for domain
- `DELETE /api/domain/:token` → remove domain

## Login

These endpoints are used for signing up with Impequid.

- `GET /api/authenticate/:token@:server` → log in or register with impequid
- `GET /api/authenticate/finish` → finish registration
- `DELETE /api/authenticate` → log out

## Fallback

These APIs are used to provide support for browsers without JavaScript.

- `POST /api/fallback/addSubdomain` → `PUT /api/domain`
- `GET /api/fallback/removeSubdomain/:token` → `DELETE /api/domain/:token`
- `GET /api/fallback/newToken/:token` → `POST /api/domain/:token`
- `GET /api/fallback/logout` → `DELETE /api/authenticate`
