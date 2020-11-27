import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import { NavView, start, nav } from 'tonva';
//import logo from './logo.svg';
import './App.css';
import { CApp, appConfig } from './tapp';

nav.setSettings(appConfig);
//如果要支持route，必须调用下面这一句
//await startRoute(appConfig);
const App: React.FC = () => {
	const onLogined = async (isUserLogin?:boolean) => {
		await start(CApp, appConfig, isUserLogin);
	}
	return <NavView onLogined={onLogined} />;
}

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
