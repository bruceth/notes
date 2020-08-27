import { CUqBase } from "tapp";
import { VSelectContact, SelectContactOptions } from "./views";
import { CTextNoteItem } from "./text";
import { EnumNoteItemType, NoteItem, NoteModel } from "./model";
import { CNoteItem } from "./item/CNoteItem";
import { VTo } from "./views/VTo";
import { CTaskNoteItem } from "./task/CTaskNoteItem";
import { Contact } from "model";
import { observable } from "mobx";
import { VSent } from "./views/VSent";
import { CFolderNoteItem, CPersonalFolderNoteItem } from "./folder";
import { CGroup } from "./group/CGroup";
import { CGroupFolderItem } from "./groupFolder";
import { CRootFolderNoteItem } from "./folder";

const cNoteItems: {[key in EnumNoteItemType]: new (...args: any[])=> CNoteItem} = {
	[EnumNoteItemType.text]: CTextNoteItem,
	[EnumNoteItemType.task]: CTaskNoteItem,
	[EnumNoteItemType.folder]: CPersonalFolderNoteItem,
	[EnumNoteItemType.group]: undefined, // CFolderNoteItem,
	[EnumNoteItemType.groupFolder]: CGroupFolderItem,
	[EnumNoteItemType.unit]: undefined, // CFolderNoteItem,
};

export class CNote extends CUqBase {
	protected foldItemStack: CFolderNoteItem[];
	rootFoldItem: CFolderNoteItem;
	currentFoldItem: CFolderNoteItem;

	@observable groupMembers: Contact[];
	@observable contacts: Contact[];
	noteItem: NoteItem;

    protected async internalStart() {
	}

	init(folderId?: number) {
		this.rootFoldItem =this.currentFoldItem = this.newSub(CRootFolderNoteItem);
		this.foldItemStack = [];
	}

	noteItemConverter = (item:NoteItem, queryResults:{[name:string]:any[]}):CNoteItem => {
		let cNoteItem = this.getCNoteItem(item.type);
		item = cNoteItem.convertObj(item);
		cNoteItem.init(item);
		return cNoteItem;
	}

	get items() {
		return this.currentFoldItem.notesPager;
	}

	updateFolderTime(note:number, time:Date) {
		this.currentFoldItem.updateTime(time);
		if (!this.currentFoldItem.noteItem)
			return;
		let fnote = this.currentFoldItem.noteItem.note;
		if (this.foldItemStack.length > 0) {
			for (var folderItem of this.foldItemStack) {
				if (this.updateSubFolderItem(folderItem, fnote)) {
					folderItem.updateTime(time);
				}
			}
		}
	}

	protected updateSubFolderItem(folder:CFolderNoteItem, fnote:number) {
		let {items} = folder.notesPager;
		let index = items.findIndex(v=>v.noteItem?.note === fnote);
		if (index > 0) {
			let fItem = items.splice(index, 1);
			items.unshift(...fItem);
		}
		return index >= 0;
	}

	openFolder(foldItem:CFolderNoteItem) {
		this.foldItemStack.push(this.currentFoldItem);
		this.currentFoldItem = foldItem;
		this.currentFoldItem.showFolder();
	}

	popFolder() {
		this.currentFoldItem = this.foldItemStack.pop();
	}

	getCNoteItem(type: EnumNoteItemType): CNoteItem {
		let ret = cNoteItems[type];
		if (ret === undefined) {
			debugger;
			throw new Error(`type ${type} CNoteItem not defined`);
		}
		return this.newSub(ret);
	}

	async load() {
		await this.currentFoldItem.load();
	}

	async refresh() {
		await this.currentFoldItem.refresh();
	}

	async getNote(id: number): Promise<NoteModel> {
		return await this.currentFoldItem.getNote(id);
	}

	async addNote(folder:number, caption:string, content:string, obj:any, type: EnumNoteItemType) {
		return await this.currentFoldItem.addNote(folder, caption, content, obj, type);
	}

	async setNote(waiting:boolean, noteItem:NoteItem, caption:string, content:string, obj:any) {
		return await this.currentFoldItem.setNote(waiting, noteItem, caption, content, obj);
	}

	async sendNoteTo(groupFolder:number, note:number, toList:number[]) {
		let tos = toList.join('|');
		await this.uqs.notes.SendNoteTo.submit({groupFolder, note, tos});
	}

	async hideNote(note:number, x:number) {
		await this.currentFoldItem.hideNote(note, x);
	}

	renderListView() {
		return this.currentFoldItem.renderListView();
	}

	showAddNotePage = (parent: number) => {
		let cTextNoteItem = this.newSub(CTextNoteItem);
		cTextNoteItem.showAddNotePage(parent);
	}

	async showTo(noteItem:NoteItem, backPageCount:Number) {
		this.noteItem = noteItem;
		let ret = await this.uqs.notes.GetMyContacts.page(
			{
				groupFolder: this.currentFoldItem.groupFolder
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
		let cTaskNoteItem = this.newSub(CTaskNoteItem);
		cTaskNoteItem.init(this.noteItem);
		cTaskNoteItem.showAssignTaskPage();
	}

	showAddGroupPage() {
		let cGroup = this.newSub(CGroup);
		cGroup.showAddPage();
	}
}
