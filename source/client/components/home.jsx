// import external

import React from 'react';

// component

export default class Home extends React.Component {

	render () {

		const {state, actions} = this.props;

		return (
			<main>
				<section className="jumbotron text-xs-center custom-noradius">
					<div className="container">
						<h1 className="jumbotron-heading">
							{state.server.name}
						</h1>
						<p className="lead text-muted">
							{state.server.name} is a free and easy to configure dynamic DNS provider.<br/>
							It allows you to access your home-server, smarthome projects and more from everywhere.<br/>
							You also get a free <a href={`https://${state.server.domain}`}>yoursubdomain.{state.server.domain}</a> subdomain of your choice!
						</p>
					</div>
				</section>
				<div className="container marketing">
					<div className="row">
						<div className="col-lg-4">
							<h2>Easy</h2>
							<p>
								This project aims to be the <b>easiest dynamic DNS</b> provider.
								Just load the update link and your subdomain works.<br/>
								No custom protocol, just a HTTP request.
							</p>
							<p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
						</div>
						<div className="col-lg-4">
							<h2>Powerful</h2>
							<p>
								{state.server.name} is powered by CloudFlare. While it's not affiliated with them, it still means it benefits from CloudFlare's global presence and <b>fast DNS updates</b>.
							</p>
							<p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
						</div>
						<div className="col-lg-4">
							<h2>Open Source</h2>
							<p>
								{state.server.name} is an instance of the MIT licensed Impequid DynDNS, this means you can easily setup your own DynDNS provider, read the source-code or even contribute.
							</p>
							<p><a className="btn btn-secondary" href="https://github.com/dodekeract/impequid-dyndns" role="button">View On GitHub &raquo;</a></p>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
