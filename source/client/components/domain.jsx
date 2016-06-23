// import external

import React from 'react';

// component

export default class Domain extends React.Component {

	render () {

		const {state, actions, page} = this.props;

		return state.subdomain ? (
			<div className="card">
				<div className="card-header">{state.subdomain}.{state.domain}</div>
				<div className="card-block">
					<div className="form-group row">
						<label className="col-sm-3 form-control-label">Update Link</label>
						<div className="col-sm-9">
							<input type="text" className="form-control" value={`https://${state.server}/api/update/${state.token}`} readOnly/>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-3 form-control-label">Current IP</label>
						<div className="col-sm-9">
							<input type="text" className="form-control" value={state.ip} placeholder="No IP Assigned Yet" readOnly/>
						</div>
					</div>
					<HistoryView history={state.history} page={page} domain={state.subdomain}/>
					<div className="btn-group btn-group-justified btn-block">
						<a href={`http://${state.subdomain}.${state.domain}`} target="_blank" className="btn btn-success custom-3-buttons">Open</a>
						<a href={`/api/fallback/newToken/${state.token}`} onClick={actions.updateSubdomainToken.bind(state.token)} className="btn btn-warning custom-3-buttons">New Update Link</a>
						<a href={`/api/fallback/removeSubdomain/${state.token}`} onClick={actions.removeSubdomain.bind(state.token)} className="btn btn-danger custom-3-buttons">Remove</a>
					</div>
				</div>
			</div>
		) : (
			<div className="alert alert-info">
				No Domain Selected
			</div>
		);

	}

}

class HistoryView extends React.Component {

	render () {
		const {history, page, domain} = this.props;

		const historyView = [];

		if (history) {
			for (let key = 0; key < 5; key++) {
				let item = history[history.length - 1 - (page * 5 + key)];
				if (item) {
					historyView.push(
						<li className="list-group-item" key={key}>
							<span className="label label-default label-pill pull-xs-right">{new Date(item.time).toTimeString()}</span>
							{item.ip}
						</li>
					);
				}
			}
		}

		return historyView.length ? (
			<ul className="list-group">
				{historyView}
				<Pagination page={page} count={history.length} linkPrefix={`/dashboard/domains/${domain}`}/>
			</ul>
		) : null;
	}

}

class Pagination extends React.Component {
	render () {

		const {page, count, linkPrefix} = this.props;

		const max = Math.floor(count / 5);

		const pages = [];

		for (let key = 0; key < max + 1; key++) {
			pages.push(page === key ? (
				<li className="page-item active" key={key}><span className="page-link">{Number(key)+1}</span></li>
			) : (
				<li className="page-item" key={key}><a className="page-link" href={`${linkPrefix}/${key}`}>{Number(key)+1}</a></li>
			));
		}

		const back = page === 0 ? (
			<li className="page-item disabled">
				<span className="page-link">
					<span aria-hidden="true">&laquo;</span>
				</span>
			</li>
		) : (
			<li className="page-item">
				<a className="page-link" href={`${linkPrefix}/0`}>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
		);
		const forward = page === max ? (
			<li className="page-item disabled">
				<span className="page-link">
					<span aria-hidden="true">&raquo;</span>
				</span>
			</li>
		) : (
			<li className="page-item">
				<a className="page-link" href={`${linkPrefix}/${max}`}>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		);

		return (
			<nav className="text-sm-center">
				<ul className="pagination pagination-sm">
					{back}
					{pages}
					{forward}
				</ul>
			</nav>
		);
	}
}
