import { CNoteBase } from "../noteBase";
import { NoteItem, NoteModel, EnumNoteType } from '../model';
import { QueryPager } from "tonva";
import { EnumSpecFolder } from "tapp";
import { VFolder } from "./views/VFolder"
import { VFolderNoteItem } from "./views/VFolderNoteItem";
import { VFolderView } from "./views/VFolderView";

export abstract class CContainer extends CNoteBase {
	folderId: number;
	notesPager: QueryPager<CNoteBase>;

	init(param: NoteItem):void {
		super.init(param);
		if (param) {
			if (!this.title) this.title = param.caption;
		}
		this.relativeKey = 'to';

		let folderId = this.noteItem?.note;
		if (!folderId) this.folderId = -EnumSpecFolder.notes;
		else this.folderId = folderId;

		this.notesPager = new QueryPager<CNoteBase>(this.uqs.notes.GetNotes, undefined, undefined, true);
		this.notesPager.setItemConverter(this.getItemConverter());
	}

	protected getItemConverter() {
		return this.owner.noteItemConverter;
	}

	async load() {
		await this.notesPager.first({folderId: this.folderId});
	}

	async refresh() {
		//每次刷新取5个。
		let newnotes = new QueryPager<NoteItem>(this.uqs.notes.GetNotes, 5, 5, false);
		await newnotes.first({folderId: this.folderId});
		let newitems = newnotes.items;
		if (newitems) {
			let len = newitems.length;
			let items = this.notesPager.items;
			for (let i = len - 1; i >= 0; --i) {
				let item = newitems[i];
				let note = item.note;
				let index = items.findIndex(v => v.noteItem.note===note);
				if (index >= 0) {
					items.splice(index, 1);
				}
				let cNoteItem = this.owner.noteItemConverter(item, undefined);
				items.unshift(cNoteItem);
			}
		}
	}

	async getNote(id: number): Promise<NoteModel> {
		let folderId = this.owner.currentFold?.folderId;
		let ret = await this.uqs.notes.GetNote.query({folder: folderId, note: id});
		let noteModel:NoteModel = ret.ret[0];
		noteModel.to = ret.to;
		noteModel.flow = ret.flow;
		noteModel.spawn = ret.spawn;
		noteModel.contain = ret.contain;
		noteModel.comments = ret.comments;
		return noteModel;
	}

	showFolder() {
		this.load();
		this.openVPage(VFolder);
	}

	renderListView() {
		return (new VFolder(this)).renderListView();
	}

	showListItemNote(noteModel: NoteModel): void {
		this.owner.openFolder(this);
	}

	async showFolderView() {
		let noteItem = this.noteItem;
		if (!noteItem)
			return;
		let noteModel = await this.getNote(noteItem.note);
		noteItem.unread = 0;
		noteItem.commentUnread = 0;
		this.noteModel = noteModel;
		this.openVPage(VFolderView);
	}

	async addNote(folder:number, caption:string, content:string, obj:any, type:EnumNoteType) {
		let sub = 0;
		let param = {
			groupFolder:this.groupFolder,
			folder:folder,
			caption,
			content,
			type,
			sub}
		let ret = await this.uqs.notes.AddNote.submit(param);
		let {note} = ret;
		let date = new Date();
		let noteItem:NoteItem = {
			seconds: undefined,
			owner: this.user.id,
			note: note as number,
			type,
			caption,
			content,
			assigned: undefined,
			from: undefined,
			fromAssigned: undefined,
			state: undefined,
			unread: 0,
			obj,
			$create: date,
			$update: date,
		}
		if (type === Number(EnumNoteType.folder)) {
			noteItem.groupFolder = this.groupFolder;
		}
		let cNoteItem = this.owner.getCNoteBase(noteItem);
		cNoteItem.init(noteItem);
		if (folder === this.folderId) {
			this.notesPager.items.unshift(cNoteItem);
		}
		return cNoteItem;
	}

	async editNote(waiting:boolean, noteItem:NoteItem, caption:string, content:string, obj:any) {
		let {SetNote} = this.uqs.notes;
		let {note, type} = noteItem;
		await SetNote.submit({note, caption, content, type}, waiting);
		// Note.resetCache(note); 现在不调用NoteTuid的cache，所以不需要了
		// noteItem.unread = 1; 自己修改自己的小单，只是移到最前面，并不显示unread
		let {items} = this.notesPager;
		let index = items.findIndex(v => v.noteItem.note===note);
		if (index >= 0) {
			let theItems = items.splice(index, 1);
			let theItem = theItems[0];
			theItem.noteItem.caption = caption;
			theItem.noteItem.content = content;
			theItem.noteItem.obj = obj;
			items.unshift(theItem);
		}
	}

	async hideNote(note:number, x:number) {
		await this.uqs.notes.HideNote.submit({note, x});
		let index = this.notesPager.items.findIndex(v => v.noteItem.note === note);
		if (index >= 0) this.notesPager.items.splice(index, 1);
	}

	renderItem(index: number): JSX.Element {
		let vNoteItem = new VFolderNoteItem(this);
		return vNoteItem.render();
	}

	async addGroup(caption:string, content:string, members:{member:number}[]) {
		let ret = await this.uqs.notes.AddGroup.submit({caption, content, members});
		let {group, folder} = ret;
		let date = new Date();
		let type = EnumNoteType.groupFolder;
		let noteItem:NoteItem = {
			seconds: undefined,
			owner: this.user.id,
			note: folder as number,
			type,
			caption,
			content,
			assigned: undefined,
			from: undefined,
			fromAssigned: undefined,
			state: undefined,
			groupFolder:group,
			unread: 0,
			obj: undefined,
			$create: date,
			$update: date,
		}
		let cNoteItem = this.owner.getCNoteBase(noteItem);
		cNoteItem.init(noteItem);
		this.notesPager.items.unshift(cNoteItem);
		return cNoteItem;
	}

}