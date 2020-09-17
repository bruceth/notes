import { CTo } from "notes/components";
import { VAssignParams } from "./VAssignParams";
import { CNoteAssign } from "./CNoteAssign";
import { Query } from "tonva";
import { Contact } from "model";
import { numberFromId } from "notes/model";

export class CAssignTo extends CTo {
	cNoteAssign: CNoteAssign;

	constructor(cApp:any, cNoteAssign: CNoteAssign) {
		let {currentFold} = cNoteAssign.owner;
		let {groupFolder, currentNoteItem} = currentFold;
		super(cApp, groupFolder, currentNoteItem);
		this.cNoteAssign = cNoteAssign;
	}

	protected get GetContacts(): Query {return this.uqs.notes.GetAssignToContacts}

	GetCheckerContacts() : Contact[] {
		let ret = this.groupContacts.filter((v,index) => {
			let vid = numberFromId(v.contact);
			if (this.contacts.findIndex(cv=> numberFromId(cv.contact) === vid) >= 0) {
				return false;
			}
			return true;
		});
		ret.unshift({contact:this.user.id, assigned:undefined, already:0});
		return ret;
	}

	protected async sendOut(toList:number[]): Promise<void> {
		await this.cNoteAssign.assignTask(toList);
	}

	protected async afterContactsSelected(): Promise<void> {
		this.openVPage(VAssignParams);
	}
}
