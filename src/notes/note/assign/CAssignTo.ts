import { CTo } from "notes/components";
import { VAssignParams } from "./VAssignParams";
import { CNoteAssign } from "./CNoteAssign";

export class CAssignTo extends CTo {
	cNoteAssign: CNoteAssign;

	constructor(cApp:any, cNoteAssign: CNoteAssign) {
		super(cApp, cNoteAssign.owner.currentFold.groupFolder);
		this.cNoteAssign = cNoteAssign;
	}

	protected async sendOut(toList:number[]): Promise<void> {
		await this.cNoteAssign.assignTask(toList);
	}

	protected async afterContactsSelected(): Promise<void> {
		this.openVPage(VAssignParams); //, {contacts, noteId: this.currentNoteId});
	}
}
