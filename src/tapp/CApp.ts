import { CUqApp } from "./CBase";
import { VMain } from "./main";
import { CHome } from "home";
import { CRelation } from "relation";
import { CMe } from "me";
import { CDiscover } from "discover";
import { computed } from "mobx";
import { Contact } from "model";

export class CApp extends CUqApp {
	cHome: CHome;
	cRelation: CRelation;
	cDiscover: CDiscover;
	cMe: CMe;

	protected async internalStart() {
		this.cHome = this.newC(CHome);
		this.cRelation = this.newC(CRelation);
		this.cDiscover = this.newC(CDiscover);
		this.cMe = this.newC(CMe);		
		this.cHome.load();
		this.showMain();
	}

	@computed get contacts(): Contact[] {return this.cRelation.contacts;};

	async loadRelation() {
		await this.cRelation.load();
	}

    private showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
	}
}
