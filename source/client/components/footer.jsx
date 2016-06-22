import React from 'react';

export default class Footer extends React.Component {

	render () {

		const {state} = this.props;

		return state.user.valid ? null : (
			<footer className="text-muted">
				<div className="container text-xs-center">
					<p>{state.server.name} is an OpenSource CloudFlare-based Dynamic DNS server. You can check the source code on <a href="https://github.com/dodekeract/impequid-dynamic-dns">GitHub</a> and even set-up your own instance!</p>
				</div>
			</footer>
		);
	}

}
