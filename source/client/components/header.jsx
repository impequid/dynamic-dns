import React from 'react';
import {navigate} from 'react-mini-router';

export default class Header extends React.Component {

	render () {
		const {state} = this.props;

		let entries = [];
		let key = 0;

		if (true) {
			entries.push(
				<li key={key++} className="nav-item">
					<a className="nav-link" href={`http://${state.impequid.defaultServer}/authenticate/dns.smartfl.at/name,notify`}>Login</a>
				</li>
			);
		} else {
			entries.push(
				<li key={key++} className="nav-item">
					<a className="nav-link" onClick={this.go.bind(this, '/dashboard')}>Dashboard</a>
				</li>
			);
		}

		return (
			<header className="navbar navbar-static-top navbar-dark bg-inverse custom-noradius">
				<div className="container">
					<a onClick={this.go.bind(this, '/')} className="navbar-brand">{state.serverName}</a>
					<ul className="nav navbar-nav">
						<li className="nav-item">
							<a className="nav-link" onClick={this.go.bind(this, '/')}>About</a>
						</li>
						{entries}
					</ul>
				</div>
			</header>
		);
	}

	go (where) {
		navigate(where);
	}

}
