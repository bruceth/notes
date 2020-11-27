import { nav } from '../components';
import { AppConfig, CAppBase } from './CAppBase';

export async function start(CApp: new (config: AppConfig) => CAppBase, appConfig: AppConfig, isUserLogin?:boolean) {	
	let {htmlTitle} = appConfig;
	if (htmlTitle) {
		document.title = htmlTitle;
	}
	let html = document.getElementsByTagName('html');
	let html0 = html[0];
	if (html0) {
		let version = html0?.getAttribute('data-version');
		if (version) appConfig.version = version;
	}

	nav.setSettings(appConfig);
	let cApp = new CApp(appConfig);
	cApp.init();
    await cApp.start(isUserLogin);
}
