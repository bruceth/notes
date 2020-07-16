import { CUqBase, EnumSpecFolder } from "tapp";
import { VHome } from "./VHome";
import { QueryPager, useUser } from "tonva";
import { CNote } from "note";


export class CHome extends CUqBase {
	cNode: CNote;
	//notesPager: QueryPager<any>;

    protected async internalStart() {
	}

	init() {
		this.cNode = this.newC(CNote);
		//let {notes} = this.uqs;
		//this.notesPager = new QueryPager<any>(notes.GetNotes);
	}

	tab = () => this.renderView(VHome);

	async load() {
		await this.cNode.load();
		//await this.notesPager.first({folderId: -EnumSpecFolder.notes});
	}
/*
	async addRNote(caption:string, content:string) {
		let ret = await this.uqs.notes.AddRNote.submit({caption, content});
		let {anchor,rNote} = ret;
		let {Anchor, RNote} = this.uqs.notes;
		this.notesPager.items.unshift({
			anchor: Anchor.boxId(anchor),
			owner: this.user.id,
			note: RNote.boxId(rNote)
		});
	}
*/
}
