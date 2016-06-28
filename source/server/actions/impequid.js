// import external

import ImpequidAPI from 'impequid-api';

// functions

export async function verify ({token, server}) {
	const iqa = new ImpequidAPI({token, server, debug: true});
	iqa.token = await iqa.getBackgroundToken();
	const {id, name} = await iqa.getUser();
	return {
		id,
		name,
		token: iqa.token
	};
}

export async function getUserID ({token, server}) {
	const iqa = new ImpequidAPI({token, server, debug: true});
	const {id} = await iqa.getUser();
	return id;
}

// export

const exported = {
	getUserID,
	verify
};

export default exported;
