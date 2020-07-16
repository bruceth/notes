import { CUqApp } from "./CBase";
import { VMain } from "./main";
import { CHome } from "home";

export class CApp extends CUqApp {
	cHome: CHome;

	protected async internalStart() {
		this.cHome = this.newC(CHome);
		this.cHome.load();
		this.showMain();
	}

    private showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
	}
}
