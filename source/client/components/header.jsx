import React from 'react';
import {navigate} from 'react-mini-router';

// helper functions

function isActive (section) {
	// TODO
	return 'nav-link' + (section === 'dashboard' ? ' active' : '');
}

// component

export default class Header extends React.Component {

	render () {
		const {state, actions} = this.props;

		const leftEntries = [];
		const rightEntries = [];
		let leftKey = 0;
		let rightKey = 0;

		if (state.user.valid) {
			leftEntries.push(
				<li key={leftKey++} className="nav-item">
					<a className={isActive('dashboard')} href="/dashboard/domains">Dashboard</a>
				</li>
			);
			rightEntries.push(
				<li key={rightKey++} className="nav-item">
					<a className="nav-link" href="/api/fallback/logout" onClick={actions.logout}>Logout</a>
				</li>
			);
		} else {
			leftEntries.push(
				<li key={leftKey++} className="nav-item">
					<a className="nav-link active" href="/">About</a>
				</li>
			);
			rightEntries.push(
				<li key={leftKey++} className="nav-item">
					<a className="nav-link" href={`https://${state.impequid.defaultServer}/authenticate/${state.server.url}/background[user[id,name],notify]`}>Login</a>
				</li>
			);
		}

		return (
			<header className="navbar navbar-static-top navbar-dark bg-inverse custom-noradius">
				<div className="container">
					<a className="navbar-brand">{state.server.name}</a>
					<ul className="nav navbar-nav">
						{leftEntries}
					</ul>
					<ul className="nav navbar-nav pull-xs-right">
						{rightEntries}
					</ul>
				</div>
			</header>
		);
	}

}
