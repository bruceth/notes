import { CTo } from "./components";
import { VActions } from "./views/VActions";
import { CNotes } from "./CNotes";

export class CShareTo extends CTo {
	private cNotes:CNotes;
	constructor(cApp:any, cNotes:CNotes) {
		super(cApp, cNotes.currentFold.groupFolder);
		this.cNotes = cNotes;
	}
	
	protected async sendOut(toList:number[]):Promise<void> {
		await this.cNotes.sendNoteTo(toList);
	}

	protected async afterContactsSelected(): Promise<void> {
		this.openVPage(VActions); //, {contacts, noteId: this.currentNoteId});
	}
}
