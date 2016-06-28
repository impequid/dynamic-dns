// functions

export function generic (k, error, text, status = 500) {
	console.error(`${status} ${k.url} ${error}`);
	k.body = {
		error: text
	};
	k.status = status;
}

export function couldNotRenderApp (k, error) {
	generic(k, error, 'could not render app');
}

export function couldNotUpdateDomain (k, error) {
	generic(k, error, 'something went wrong');
}

export function couldNotGetDomains (k, error) {
	generic(k, error, 'could not get domains');
}

export function couldNotRemoveFromCloudFlare (k, error) {
	generic(k, error, 'could not remove IP from CloudFlare');
}

export function couldNotRemoveDatabaseEntry (k, error) {
	generic(k, error, 'could not remove database entry');
}

export function couldNotRefreshToken (k, error) {
	generic(k, error, 'could not refresh token');
}

export function couldNotAddDomain (k, error) {
	generic(k, error, 'could not update domain', 403)
}

export function captchaFailed (k, error) {
	generic(k, error, 'captcha failed', 403);
}

export function invalidToken (k, error) {
	generic(k, error, 'invalid token', 403);
}

export function couldNotVerifyImpequidToken (k, error) {
	generic(k, error, 'could not verify impequid token');
}

export function couldNotUpdateToken (k, error) {
	generic(k, error, 'could not update token');
}

export function unauthorized (k) {
	k.body = {
		error: 'unauthorized'
	};
	k.status = 401;
}

// export

const exported = {
	captchaFailed,
	couldNotAddDomain,
	couldNotRefreshToken,
	couldNotRemoveDatabaseEntry,
	couldNotRemoveFromCloudFlare,
	couldNotRenderApp,
	couldNotUpdateDomain,
	couldNotUpdateToken,
	couldNotVerifyImpequidToken,
	generic,
	invalidToken,
	unauthorized
};

export default exported;
