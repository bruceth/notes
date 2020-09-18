import { CTo } from "notes/components";
import { VTo } from "notes/components/to/VTo"
import { VAssignParams } from "./VAssignParams";
import { CNoteAssign } from "./CNoteAssign";
import { Query } from "tonva";
import { Contact } from "model";

export class CAssignTo extends CTo {
	cNoteAssign: CNoteAssign;

	constructor(cApp:any, cNoteAssign: CNoteAssign) {
		let {currentFold} = cNoteAssign.owner;
		let {groupFolder, currentNoteItem} = currentFold;
		super(cApp, groupFolder, currentNoteItem);
		this.cNoteAssign = cNoteAssign;
	}

	protected get GetContacts(): Query {return this.uqs.notes.GetAssignToContacts}

	protected async internalStart():Promise<void> {
		let ret = await this.GetContacts.page(
			{
				groupFolder: this.currentGroupFolder,
				note: this.currentNoteItem.note,
			}, 0, 50, true);
		this.groupContacts = ret.$page;
		this.groupContacts.unshift({contact:this.user.id, assigned:'[自己]', already:0});
		this.startAction();
		this.openVPage(VTo);
	}

	GetAssignToContacts() : Contact[] {
		return this.groupContacts;
		// let ret = this.groupContacts.filter((v,index) => {
		// 	let vid = numberFromId(v.contact);
		// 	if (this.contacts.findIndex(cv=> numberFromId(cv.contact) === vid) >= 0) {
		// 		return false;
		// 	}
		// 	return true;
		// });
		// ret.unshift({contact:this.user.id, assigned:'[自己]', already:0});
		// return ret;
	}

	protected async sendOut(toList:number[]): Promise<void> {
		await this.cNoteAssign.assignTask(toList);
	}

	protected async afterContactsSelected(): Promise<void> {
		this.openVPage(VAssignParams);
	}
}
