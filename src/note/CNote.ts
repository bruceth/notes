import { CUqBase, EnumSpecFolder } from "tapp";
import { QueryPager } from "tonva";
import { VList } from "./VList";
import { VAddNotePage } from "./VAddNotePage";

export class CNote extends CUqBase {
	notesPager: QueryPager<any>;

    protected async internalStart() {
	}

	init() {
		let {notes} = this.uqs;
		this.notesPager = new QueryPager<any>(notes.GetNotes);
	}

	async load() {
		await this.notesPager.first({folderId: -EnumSpecFolder.notes});
	}

	async addNote(caption:string, content:string) {
		let ret = await this.uqs.notes.AddNote.submit({caption, content});
		let {note} = ret;
		let {Note} = this.uqs.notes;
		this.notesPager.items.unshift({
			owner: this.user.id,
			note: Note.boxId(note),
			$create: new Date(),
			$update: new Date(),
		});
		return ret;
	}

	async setNote(note:number, caption:string, content:string) {
		let {SetNote, Note} = this.uqs.notes;
		await SetNote.submit({note, caption, content});
		Note.resetCache(note);
		let {items} = this.notesPager;
		let index = items.findIndex(v => v.note===note);
		if (index >= 0) {
			let removed = items.splice(index, 1);
			items.unshift(...removed);
		}
	}

	async sendNoteTo(note:number, toList:number[]) {
		let tos = toList.map(v => {
			return {to: v}
		});
		await this.uqs.notes.SendNoteTo.submit({note, tos});
	}

	renderListView() {
		return this.renderView(VList);
	}

	showAddRNotePage = () => {
		this.openVPage(VAddNotePage)
	}
}
