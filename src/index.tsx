import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import { NavView, start, nav, CAppBase, startRoute, Page } from 'tonva';
//import logo from './logo.svg';
import './App.css';
import { CApp, appConfig } from './tapp';
import { /*CAppAB, CAppCD, */CAppBBBBCCCC } from 'tapp/CAppAB';

const debugRouter = false;
if (debugRouter) {
	(async function() {
		function renderDom(div:any) {
			ReactDOM.render(
				<React.StrictMode>
					{div}
				</React.StrictMode>,
				document.getElementById('root')
			);
		}

		function renderCApp(cApp: CAppBase) {
			const App: React.FC = () => {
				const onLogined = async () => {
					await cApp.start();
				}
				return <NavView onLogined={onLogined} />;
			}
			renderDom(<App/>);
		}
		nav.on({
			'/a/b': () => {
				const App: React.FC = () => {
					const onLogined = async () => {
						let el:HTMLBodyElement = document.getElementsByTagName('body')[0] as HTMLBodyElement;
						if (el) {
							el.style.setProperty('background-color', 'lightblue');
						}
						nav.push(<Page webNav={{
							navRawHeader:<div className="py-3 font-weight-bold text-success">web nav header</div>, 
							navRawFooter:<div className="py-3 text-danger">web nav footer</div>}}>
							<div className="py-3 bg-white">
								/a/b <button onClick={()=>nav.navigate('/c/d')}>test</button>
							</div>
						</Page>);
					}
					return <NavView onLogined={onLogined} notLogined={onLogined} />;
				}
				renderDom(<App/>);
			},
			'/c/d': () => {
				renderDom(<div>
					/c/d
					<button onClick={()=>nav.navigate('/eeee/a/1?c=1 & d=3')}>test</button>
				</div>)
			},
			'/eeee/:action/:id': (params:any, queryStr:any) => {
				let span:any;
				if (queryStr) {
					span = <span>{queryStr}</span>
				}
				renderDom(<div>/e query:{span}  params:{JSON.stringify(params)}</div>)
			},
			'/bbbb/cccc': () => {
				renderCApp(new CAppBBBBCCCC());
			},
		});
		nav.on(() => {
			renderCApp(new CApp());
		});
		await startRoute(appConfig);

		// If you want your app to work offline and load faster, you can change
		// unregister() to register() below. Note this comes with some pitfalls.
		// Learn more about service workers: https://bit.ly/CRA-PWA
		serviceWorker.unregister();
	})();
}
else {
	(async function() {
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
	})();
}