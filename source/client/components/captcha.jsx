// import external
import ReCaptcha from 'react-gcaptcha';
import React from 'react';

// import internal
import store from '../stores/captcha';
import actions from '../actions/captcha';

export default class Captcha extends React.Component {

	constructor () {
		super();

		this.state = store.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount () {
		store.addChangeListener(this.onChange);
	}

	componentWillUnmount () {
		store.removeChangeListener(this.onChange);
	}

	render () {
		const state = this.state;
		return (
			<div>
				<main>
					<div className="jumbotron custom-noradius">
						<div className="container">
							<h1>Just One More Step</h1>
						</div>
					</div>
					<div style={{width: '304px', marginLeft: 'auto', marginRight: 'auto'}}>
						<fieldset className="form-group">
							<label>Captcha</label><br/>
							<ReCaptcha verifyCallback={actions.update} sitekey={state.reCaptchaKey}/>
							<small className="text-muted">Unfortunately, impequid is not available for robots.</small>
						</fieldset>
						<fieldset className="form-group">
							<label htmlFor="registerCheckbox">Legal Stuff</label><br/>
							<input id="registerCheckbox" type="checkbox" onChange={actions.accept} checked={state.accepted} required/> I accept the <a href={state.links.privacyPolicy} target="_blank">Privacy Policy</a> and <a href={state.links.termsOfService} target="_blank">Terms Of Service</a><br/>
							<small className="text-muted">TLDR: Your data is used to make {state.serverName} work.</small>
						</fieldset>
						<button onClick={actions.submit} className="btn btn-success btn-lg btn-block">Submit</button>
					</div>
				</main>
			</div>
		);
	}

	onChange () {
		this.setState(store.getState());
	}

}
