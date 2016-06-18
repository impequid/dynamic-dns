// import external

import React from 'react';
import {navigate, RouterMixin} from 'react-mini-router';

// import internal

import actions from '../actions/main';
import store from '../stores/main';

// components
import Header from './header';
import Footer from './footer';
import Dashboard from './dashboard';
import Home from './home';

// use es5 because es6 doesn't support mixins
const App = React.createClass({
	mixins: [RouterMixin],

	routes: {
		'/': 'home',
		'/dashboard': 'dashboard',
		'/dashboard/:view/': 'dashboard',
		'/dashboard/:view/:item': 'dashboard',
		'/authenticate': 'authenticate'
	},

	getInitialState: store.getState,

	componentDidMount () {
		store.addChangeListener(this.onChange);
	},

	componentWillUnmount () {
		store.removeChangeListener(this.onChange);
	},

	render () {
		return (
			<div>
				<Header state={this.state} actions={actions}/>
				{this.renderCurrentRoute()}
				<Footer state={this.state}/>
			</div>
		);
	},

	dashboard (view, item) {
		if (typeof item !== 'string') item = null;
		return (
			<Dashboard view={view} item={item} state={this.state} actions={actions}/>
		);
	},

	home () {
		return (
			<Home state={this.state} actions={actions}/>
		);
	},

	onChange () {
		this.setState(store.getState());
	}
});

module.exports = App;
