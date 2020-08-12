import { CUqApp } from "./CBase";
import { VMain } from "./main";
import { CHome } from "home";
import { CRelation } from "relation";
import { CMe } from "me";
import { CDiscover } from "discover";
import { computed } from "mobx";
import { Contact } from "model";

const gaps = [10, 3,3,3,3,3,5,5,5,5,5,5,5,5,10,10,10,10,15,15,15,30,30,60];

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

		setInterval(this.callTick, 1000);
	}

	@computed get contacts(): Contact[] {return this.cRelation.contacts;};

	async loadRelation() {
		await this.cRelation.load();
	}

    private showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
	}

	private tick = 0;
	private gapIndex = 0;
	private callTick = async () => {
		try {
			if (!this.user) return;
			++this.tick;
			if (this.tick<gaps[this.gapIndex]) return;
			console.error('tick ', new Date());
			this.tick = 0;
			if (this.gapIndex < gaps.length - 1) ++this.gapIndex;
			let ret = await this.uqs.notes.$Poked.query(undefined, false);
			let v = ret.ret[0];
			if (v === undefined) return;
			if (!v.poke) return;
			this.gapIndex = 1;

			// uq 里面加入这一句，会让相应的$Poked查询返回poke=1：
			// TUID [$User] ID (member) SET poke=1;
			// 这个地方重新调入的数据
			// this.cGroup.refresh();
		}
		catch {
		}
	}
}
