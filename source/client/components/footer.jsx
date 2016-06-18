import React from 'react';

export default class Footer extends React.Component {

	render () {

		const {state} = this.props;

		return state.user.valid ? null : (
			<footer className="text-muted">
				<div className="container custom-text-center">
					<p>{state.server.name} is an OpenSource CloudFlare-based DynDNS server. You can check the source code on <a href="https://github.com/dodekeract/impequid-dyndns">GitHub</a> and even set-up your own instance!</p>
				</div>
			</footer>
		);
	}

}
