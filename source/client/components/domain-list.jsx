// import external

import React from 'react';

// component

export default class DomainList extends React.Component {

	render () {

		const {state, actions, item} = this.props;

		const domainList = [];
		let key = 0;

		state.domains.forEach(entry => {
			domainList.push(
				<DomainListItem key={key++} state={{
					subdomain: entry.subdomain,
					domain: state.server.domain,
					active: item === entry.subdomain
				}}/>
			);
		});

		return (
			<div className="list-group">
				{domainList}
			</div>
		);

	}

}

export class DomainListItem extends React.Component {

	render () {

		const {state} = this.props;

		return (
			<a href={`/dashboard/domains/${state.subdomain}`} className={`list-group-item${state.active ? ' active' : ''}`}>
				{state.subdomain}.{state.domain}
			</a>
		);
	}

}
