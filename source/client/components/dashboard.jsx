// import external

import React from 'react';

// import internal

import DomainList from './domain-list';
import Domain from './domain';

// helper functions

function isView (view, check) {
	return view === check ? ' active' : '';
}

// component

export default class Dashboard extends React.Component {

	render () {

		const {actions, item, state, view, page} = this.props;

		// match appropriate view component

		const ViewComponent = {
			domains: DomainView
		}[view];

		return (
			<div>
				<div className="jumbotron custom-dashboard custom-noradius">
					<div className="container">
						<h1>Dashboard</h1>
					</div>
				</div>
				<nav className="navbar navbar-dark bg-inverse custom-navbar custom-noradius">
					<div className="container">
						<ul className="nav navbar-nav">
							<li className="nav-item">
								<a className={`nav-link${isView(view, 'domains')}`} href="/dashboard/domains">Domains</a>
							</li>
						</ul>
					</div>
				</nav>
				<ViewComponent page={page} state={state} actions={actions} item={item}/>
			</div>
		);
	}
}

export class DomainView extends React.Component {

	render () {

		const {actions, item, state, view, page} = this.props;

		let currentDomain = {
			domain: null
		};

		// find subdomain in store
		state.domains.forEach(entry => {
			if (entry.subdomain === item) {
				currentDomain = Object.assign({
					domain: state.server.domain,
					server: state.server.url
				}, entry);
			}
		});

		return (
			<main className="container">
				<br/>
				<div className="row">
					<div className="col-md-6">
						<DomainList state={state} item={item} actions={actions}/>
						{state.domains.length !== 0 ? <br/> : null /* only add space if DomainList isn't empty */}
						<form method="post" action="/api/fallback/addSubdomain" style={{marginBottom: 0}} className="input-group" onSubmit={actions.addSubdomain}>
							<input name="subdomain" onChange={actions.updateAddSubdomain} type="text" className="form-control" style={{borderRight: 0}} placeholder="Your Subdomain"/>
							<span className="input-group-addon">.{state.server.domain}</span>
							<span className="input-group-btn">
								<input type="submit" className="btn btn-success" value="Add Subdomain"/>
							</span>
						</form>
						{state.server.maxDomains - state.domains.length === 0 ? null : (
							<small className="text-muted">You can add {state.server.maxDomains - state.domains.length} more subdomains.</small>
						)}
					</div>
					<div className="col-md-6">
						<Domain actions={actions} page={page} state={currentDomain}/>
					</div>
				</div>
			</main>
		);
	}

}
