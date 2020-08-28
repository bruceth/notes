import { CUqSub } from "tapp";
import { CNotes } from "../CNotes";
import { VGroupAdd } from "./VGroupAdd";
import { observable } from "mobx";
import { Contact } from "model";

export class CGroup extends CUqSub<CNotes> {
	@observable contacts: Contact[];

    protected async internalStart() {
	}

	async showAddPage() {
		await this.cApp.loadRelation();
		this.openVPage(VGroupAdd);
	}
}
