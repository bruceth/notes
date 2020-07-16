import { CUqBase, EnumSpecFolder } from "tapp";
import { QueryPager } from "tonva";
import { VList } from "./VList";
import { VAddRNotePage } from "./VAddRNotePage";

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

	async addRNote(caption:string, content:string) {
		let ret = await this.uqs.notes.AddRNote.submit({caption, content});
		let {anchor,rNote} = ret;
		let {Anchor, RNote} = this.uqs.notes;
		this.notesPager.items.unshift({
			anchor: Anchor.boxId(anchor),
			owner: this.user.id,
			rNote: RNote.boxId(rNote)
		});
	}

	async setRNote(rNote:number, caption:string, content:string) {
		let {SetRNote, RNote} = this.uqs.notes;
		await SetRNote.submit({rNote, caption, content});
		RNote.resetCache(rNote);
	}

	renderListView() {
		return this.renderView(VList);
	}

	showAddRNotePage = () => {
		this.openVPage(VAddRNotePage)
	}
}
