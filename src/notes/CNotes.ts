import { CUqBase } from "tapp";
import { observable } from "mobx";
import { VSelectContact, SelectContactOptions } from "./views";
import { EnumNoteType, NoteItem, NoteModel } from "./model";
import { CNoteBase } from "./noteBase";
//import { CNoteText, CNoteTask } from "./note";
import { CContainer, CFolderRoot } from "./container";
import { CGroup } from "./group";
import { Contact } from "../model";
import { VSent } from "./views/VSent";
import { VTo } from "./views/VTo";
import { createNoteBase } from "./factory";
import { createCNoteText, createCNoteTask } from "./note";

export class CNotes extends CUqBase {
	protected foldStack: CContainer[];
	rootFold: CContainer;
	currentFold: CContainer;

	@observable groupMembers: Contact[];
	@observable contacts: Contact[];
	noteItem: NoteItem;

    protected async internalStart() {
	}

	init(folderId?: number) {
		this.rootFold =this.currentFold = this.newSub(CFolderRoot);
		this.foldStack = [];
	}

	noteItemConverter = (item:NoteItem, queryResults:{[name:string]:any[]}):CNoteBase => {
		let cNoteBase = this.getCNoteBase(item);
		item = cNoteBase.convertObj(item);
		cNoteBase.init(item);
		return cNoteBase;
	}

	get items() {
		return this.currentFold.notesPager;
	}

	updateFolderTime(note:number, time:Date) {
		this.currentFold.updateTime(time);
		if (!this.currentFold.noteItem)
			return;
		let fnote = this.currentFold.noteItem.note;
		if (this.foldStack.length > 0) {
			for (var folderItem of this.foldStack) {
				if (this.updateSubFolderItem(folderItem, fnote)) {
					folderItem.updateTime(time);
				}
			}
		}
	}

	protected updateSubFolderItem(folder:CContainer, fnote:number) {
		let {items} = folder.notesPager;
		let index = items.findIndex(v=>v.noteItem?.note === fnote);
		if (index > 0) {
			let fItem = items.splice(index, 1);
			items.unshift(...fItem);
		}
		return index >= 0;
	}

	openFolder(foldItem:CContainer) {
		this.foldStack.push(this.currentFold);
		this.currentFold = foldItem;
		this.currentFold.showFolder();
	}

	popFolder() {
		this.currentFold = this.foldStack.pop();
	}

	getCNoteBase(noteItem: NoteItem): CNoteBase {
		let ret = createNoteBase(noteItem, this); // NoteTypes[type];
		if (ret === undefined) {
			debugger;
			throw new Error(`type ${noteItem.type} CNoteItem not defined`);
		}
		return ret;
		//ret.init()
		//return this.newSub(ret);
	}

	async load() {
		await this.currentFold.load();
	}

	async refresh() {
		await this.currentFold.refresh();
	}

	async getNote(id: number): Promise<NoteModel> {
		return await this.currentFold.getNote(id);
	}

	async addNote(folder:number, caption:string, content:string, obj:any, type: EnumNoteType) {
		return await this.currentFold.addNote(folder, caption, content, obj, type);
	}

	async setNote(waiting:boolean, noteItem:NoteItem, caption:string, content:string, obj:any) {
		return await this.currentFold.editNote(waiting, noteItem, caption, content, obj);
	}

	async sendNoteTo(groupFolder:number, note:number, toList:number[]) {
		let tos = toList.join('|');
		await this.uqs.notes.SendNoteTo.submit({groupFolder, note, tos});
	}

	async hideNote(note:number, x:number) {
		await this.currentFold.hideNote(note, x);
	}

	renderListView() {
		return this.currentFold.renderListView();
	}

	showAddNotePage = (parent: number) => {
		let cNoteText = createCNoteText(this); // this.newSub(CNoteText);
		cNoteText.showAddNotePage(parent);
	}

	async showTo(noteItem:NoteItem, backPageCount:Number) {
		this.noteItem = noteItem;
		let ret = await this.uqs.notes.GetMyContacts.page(
			{
				groupFolder: this.currentFold.groupFolder
			}, 0, 50, true);
		this.groupMembers = ret.$page;
		this.openVPage(VTo, backPageCount);
	}

	showSentPage() {
		this.openVPage(VSent);
	}

	async callSelectContact(options: SelectContactOptions): Promise<Contact[]> {
		return await this.vCall(VSelectContact, options);
	}

	showAssignTaskPage() {
		let cNoteTask = createCNoteTask(this, this.noteItem); // this.newSub(CNoteTask);
		cNoteTask.init(this.noteItem);
		cNoteTask.showAssignTaskPage();
	}

	showAddGroupPage() {
		let cGroup = this.newSub(CGroup);
		cGroup.showAddPage();
	}
}
