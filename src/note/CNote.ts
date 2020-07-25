import { CUqBase, EnumSpecFolder } from "tapp";
import { QueryPager } from "tonva";
import { VList, VSelectContact, SelectContactOptions } from "./views";
import { CTextNoteItem } from "./text";
import { EnumNoteItemType, NoteItem, NoteModel } from "./model";
import { CNoteItem } from "./item/CNoteItem";
import { VTo } from "./views/VTo";
import { CTaskNoteItem } from "./task/CTaskNoteItem";
import { Contact } from "model";
import { observable } from "mobx";
import { VSent } from "./views/VSent";

export class CNote extends CUqBase {
	folderId: number;
	notesPager: QueryPager<any>;
	cTextNoteItem: CTextNoteItem;
	cTaskNoteItem: CTaskNoteItem;
	private cNoteItems: {[key in EnumNoteItemType]: CNoteItem};
	@observable contacts: Contact[];
	noteItem: NoteItem;
	noteModel: NoteModel;

    protected async internalStart() {
	}

	init(folderId?: number) {
		if (!folderId) this.folderId = -EnumSpecFolder.notes;
		else this.folderId = folderId;
		let {notes} = this.uqs;
		this.notesPager = new QueryPager<any>(notes.GetNotes, undefined, undefined, true);
		this.cTextNoteItem = this.newSub(CTextNoteItem);
		this.cTaskNoteItem = this.newSub(CTaskNoteItem);
		this.cNoteItems = {
			[EnumNoteItemType.text]: this.cTextNoteItem,
			[EnumNoteItemType.task]: this.cTaskNoteItem,
		}
	}

	getCNoteItem(type: EnumNoteItemType): CNoteItem {
		let ret = this.cNoteItems[type];
		if (ret === undefined) {
			debugger;
			throw new Error(`type ${type} CNoteItem not defined`);
		}
		return ret;
	}

	async load() {
		await this.notesPager.first({folderId: this.folderId});
	}

	async getNote(id: number): Promise<NoteModel> {
		let ret = await this.uqs.notes.GetNote.query({folder: this.folderId, note: id});
		return ret.ret[0];
	}

	async addNote(caption:string, content:string) {
		let type = EnumNoteItemType.text;
		let sub = 0;
		let ret = await this.uqs.notes.AddNote.submit({caption, content, type, sub});
		let {note} = ret;
		let {Note} = this.uqs.notes;
		this.notesPager.items.unshift({
			owner: this.user.id,
			note: Note.boxId(note),
			type: EnumNoteItemType.text,
			sub: 0,
			$create: new Date(),
			$update: new Date(),
		});
		return ret;
	}

	async setNote(waiting:boolean, noteItem:NoteItem, caption:string, content:string) {
		let {SetNote, Note} = this.uqs.notes;
		let {note, type} = noteItem;
		await SetNote.submit({note, caption, content, type}, waiting);
		Note.resetCache(note);
		let {items} = this.notesPager;
		let index = items.findIndex(v => v.note===note);
		if (index >= 0) {
			let removed = items.splice(index, 1);
			items.unshift(...removed);
		}
	}

	async sendNoteTo(note:number, toList:number[]) {
		let tos = toList.join('|');
		await this.uqs.notes.SendNoteTo.submit({note, tos});
	}

	renderListView() {
		return this.renderView(VList);
	}

	showAddNotePage = () => {
		this.cTextNoteItem.showAddNotePage();
		// this.openVPage(VAdd)
	}

	showTo(noteId:number) {
		this.openVPage(VTo, noteId);
	}

	showSentPage() {
		this.openVPage(VSent);
	}

	async callSelectContact(options: SelectContactOptions): Promise<Contact[]> {
		return await this.vCall(VSelectContact, options);
	}
}
