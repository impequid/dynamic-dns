// import external

import React from 'react';
import TimeAgo from 'react-timeago';

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
					<Pagination history={state.history} page={page} linkPrefix={`/dashboard/domains/${state.subdomain}`}/>
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

		if (!history) return null;

		const historyView = [];

		for (let key = 0; key < 5; key++) {
			let item = history[history.length - 1 - (page * 5 + key)];
			if (item) {
				historyView.push(
					<li className="list-group-item" key={key}>
						<span className="label label-default label-pill pull-xs-right"><TimeAgo date={item.time}/></span>
						{item.ip}
					</li>
				);
			}
		}

		return historyView.length ? (
			<ul className="list-group">
				{historyView}
			</ul>
		) : null;
	}

}

class Pagination extends React.Component {
	render () {

		const {page, history, linkPrefix} = this.props;

		// don't display if not needed
		if (!history || history.length === 0) return null;

		const max = Math.ceil(history.length / 5);

		// fix spacing if pagination is unnecessary
		if (max === 1) return (<br/>);

		// middle section

		const pages = [];

		for (let key = 0; key < max; key++) {
			pages.push(page === key ? (
				<li className="page-item active" key={key}><span className="page-link">{key + 1}</span></li>
			) : (
				<li className="page-item" key={key}><a className="page-link" href={`${linkPrefix}/${key}`}>{key + 1}</a></li>
			));
		}

		// left section

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

		// right section

		const forward = page === max - 1 ? (
			<li className="page-item disabled">
				<span className="page-link">
					<span aria-hidden="true">&raquo;</span>
				</span>
			</li>
		) : (
			<li className="page-item">
				<a className="page-link" href={`${linkPrefix}/${max - 1}`}>
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
