import { CUqBase } from "tapp";
import { VRelation } from "./VRelation";
import { observable } from "mobx";
import { Contact } from "model";

export class CRelation extends CUqBase {
	private loaded: boolean = false;
	@observable contacts: Contact[] = [];

    protected async internalStart() {
	}

	tab = () => this.renderView(VRelation);

	load = async () => {
		if (this.loaded === true) return;
		let ret = await this.uqs.notes.GetMyContacts.page({}, 0, 500, true);
		this.contacts.push(...ret['$page']);
		this.loaded = true;
	}

	async AddContact(contact: number) {
		await this.uqs.notes.AddContact.submit({contact});
	}
}
