// import external

import React from 'react';

// component

export default class Domain extends React.Component {

	render () {

		const {state, actions} = this.props;

		const historyView = [];
		let key = 0;

		state.history.reverse().forEach(item => {
			historyView.push(
				<li className="list-group-item" key={key++}>
					<span className="label label-default label-pill pull-xs-right">{new Date(item.time).toTimeString()}</span>
					{item.ip}
				</li>
			);
		});

		return state.subdomain ? (
			<div className="card">
				<div className="card-header">{state.subdomain}.{state.domain}</div>
				<div className="card-block">
					<div className="form-group row">
						<label htmlFor="" className="col-sm-3 form-control-label">Update Link</label>
						<div className="col-sm-9">
							<input type="text" className="form-control" value={`https://${state.server}/api/update/${state.token}`} readOnly/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="" className="col-sm-3 form-control-label">Current IP</label>
						<div className="col-sm-9">
							<input type="text" className="form-control" value={state.ip} placeholder="No IP Assigned Yet" readOnly/>
						</div>
					</div>
					<ul className="list-group">
						{historyView}
					</ul>
					<br/>
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
