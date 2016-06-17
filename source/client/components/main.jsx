// import external

import React from 'react';
import {RouterMixin} from 'react-mini-router';

// import internal

import actions from '../actions/main';
import store from '../stores/main';

// components
import Header from './header';
import Footer from './footer';

// use es5 because es6 doesn't support mixins
const App = React.createClass({
	mixins: [RouterMixin],

	routes: {
		'/': 'dashboard',
		'/authenticate': 'authenticate',
		'/about': 'about'
	},

	getInitialState: store.getState,

	componentDidMount () {
		store.addChangeListener(this._onChange);
	},

	componentWillUnmount () {
		store.removeChangeListener(this._onChange);
	},

	render () {
		return (
			<div>
				<Header state={this.state}/>
				{this.renderCurrentRoute()}
				<Footer/>
			</div>
		);
	},

	dashboard () {
		const state = this.state;

		return (
			<main>
				<section className="jumbotron text-xs-center custom-noradius">
					<div className="container">
						<h1 className="jumbotron-heading">
							{state.serverName}
						</h1>
						<p className="lead text-muted">
							{state.serverName} is a free and easy to configure dynamic DNS provider.<br/>
							It allows you to access your home-server, smarthome projects and more from everywhere.<br/>
							You also get a free <a href={`https://${state.domain}`}>yoursubdomain.{state.domain}</a> subdomain of your choice!
						</p>
						<p className="btn-group">
							<a href="#" className="btn btn-primary">Sign In</a>
							<a href="#" className="btn btn-secondary">Register</a>
						</p>
					</div>
				</section>
				<div className="container marketing">
					<div className="row">
						<div className="col-lg-4">
							<img className="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"/>
							<h2>Easy</h2>
							<p>
								This project aims to be the <b>easiest dynamic DNS</b> provider.
								Just load the update link and your subdomain works.<br/>
								No custom protocol, just a HTTP request.
							</p>
							<p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
						</div>
						<div className="col-lg-4">
							<img className="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"/>
							<h2>Powerful</h2>
							<p>
								{state.serverName} is powered by CloudFlare. While it's not affiliated with them, it still means it benefits from CloudFlare's global presence and <b>fast DNS updates</b>.
							</p>
							<p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
						</div>
						<div className="col-lg-4">
							<img className="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"/>
							<h2>Open Source</h2>
							<p>
								{state.serverName} is an instance of the MIT licensed Impequid DynDNS, this means you can easily setup your own DynDNS provider, read the source-code or even contribute.
							</p>
							<p><a className="btn btn-secondary" href="https://github.com/dodekeract/impequid-dyndns" role="button">View On GitHub &raquo;</a></p>
						</div>
					</div>
				</div>
			</main>
		);
	},

	authenticate () {
		let verify = (key) => {
			console.log(key);
		};
		return (
			<main className="jumbotron">
				<form className="form-register" method="post" action="/register">
					<h2 className="form-register-heading">Create An Account</h2>
					<div className="alert alert-danger">
						<b>Never</b> sign in if the URL is not exactly <code>https://dns.smartfl.at</code>.
					</div>
					<input type="text" name="name" className="form-control" placeholder="Username" required autofocus/>
					<input type="email" name="email" className="form-control" placeholder="Email Address" required/>
					<input type="password" name="password" className="form-control" placeholder="Password" required/>
					<ReCaptcha verifyCallback={verify} sitekey="6LehOyETAAAAANm7M6boeGUW7h6vmJ3kp44I16vP"/>
					<button className="btn btn-lg btn-primary btn-block" type="submit">Create Account</button>
				</form>
			</main>
		);
	},

	about () {
		return (
			<div>about</div>
		);
	},

	_onChange () {
		this.setState(store.getState());
	}
});

module.exports = App;
