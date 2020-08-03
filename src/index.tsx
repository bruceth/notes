import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import { NavView, start, nav, AppConfig, CAppBase, UQsMan } from 'tonva';
//import logo from './logo.svg';
import './App.css';
import { CApp, appConfig } from './tapp';
import { navigo } from 'navigo';
import { CAppAB, CAppCD, CAppBBBBCCCC } from 'tapp/CAppAB';

(async function() {
	nav.setSettings(appConfig);
	const onLogined = async () => {
		await start(CAppCreator, appConfig);
	}
	let navView = <NavView onLogined={onLogined} />;

	await nav.init();
	//let n = nav;
	//let af = appInFrame;
	let {appName, version, tvs} = appConfig;
	await UQsMan.load(appName, version, tvs);

	let CAppCreator: new (config: AppConfig) => CAppBase = CApp;

	navigo.on({
		'/a/b': () => CAppCreator = CAppAB,
		'/c/d': () => CAppCreator = CAppCD,
		'/bbbb/cccc': () => {
			CAppCreator = CAppBBBBCCCC;
			console.log('CAppBBBBCCCC');
			start(CAppCreator, appConfig);
			return;
		},
	}).resolve();
	navigo.on(() => {
		CAppCreator = CApp
	}).resolve();


	const App: React.FC = () => navView;

	ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
	);

	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA
	serviceWorker.unregister();
})();
