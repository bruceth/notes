import { CTo } from "notes/components";
import { VAssignParams } from "./VAssignParams";
import { CNoteAssign } from "./CNoteAssign";
import { Query } from "tonva";

export class CAssignTo extends CTo {
	cNoteAssign: CNoteAssign;

	constructor(cApp:any, cNoteAssign: CNoteAssign) {
		let {currentFold} = cNoteAssign.owner;
		let {groupFolder, currentNoteItem} = currentFold;
		super(cApp, groupFolder, currentNoteItem);
		this.cNoteAssign = cNoteAssign;
	}

	protected get GetContacts(): Query {return this.uqs.notes.GetSpawnContacts}

	protected async sendOut(toList:number[]): Promise<void> {
		await this.cNoteAssign.assignTask(toList);
	}

	protected async afterContactsSelected(): Promise<void> {
		this.openVPage(VAssignParams); //, {contacts, noteId: this.currentNoteId});
	}
}
