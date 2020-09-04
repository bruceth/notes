import { CUqBase } from "tapp";
import { observable } from "mobx";
import { VSelectContact, SelectContactOptions } from "./views";
import { EnumNoteType, NoteItem, NoteModel } from "./model";
import { CNoteBase } from "./noteBase";
import { CContainer, CFolderRoot, createCSpace, createCFolder } from "./container";
import { CGroup } from "./group";
import { Contact } from "../model";
import { VSent } from "./views/VSent";
import { VTo } from "./views/VTo";
import { createCNoteTask } from "./note";
import { VHomeDropdown, VSpaceDropdown } from "./views/VNotesDropDown";
import { CNoteText } from "./note/text";
import { CNoteAssign } from "./note/assign";
import { CFolderMy } from "./container/folderMy";

export class CNotes extends CUqBase {
	protected foldStack: CContainer[];
	rootFold: CContainer;
	currentFold: CContainer;

	@observable groupMembers: Contact[];
	@observable contacts: Contact[];
	noteItem: NoteItem;

    protected async internalStart() {
	}

	init() {
		this.rootFold =this.currentFold = this.newSub(CFolderRoot);
		this.foldStack = [];
	}

	noteItemConverter = (item:NoteItem, queryResults:{[name:string]:any[]}):CNoteBase => {
		let {type, content, flowContent} = item;
		if (flowContent) {
			let obj = JSON.parse(flowContent);
			item.obj = obj;
		}
		else if (content) {
			if (content[0] === '{') {
				let obj = JSON.parse(content);
				if (type === EnumNoteType.text) {
					switch (obj.check) {
						case 1: item.type = EnumNoteType.textList; break;
						case 2: item.type = EnumNoteType.textCheckable; break;
					}
				}
				item.obj = obj;
			}
			else {
				item.obj = content;
			}
		}

		let cNoteBase = this.createCNoteBase(item);
		cNoteBase.init(item);
		return cNoteBase;
	}

	itemChanged(noteItem: NoteItem) {
		let folderNoteItem = this.currentFold.itemChanged(noteItem);
		if (this.foldStack.length > 0) {
			for (let folder of this.foldStack) {
				folderNoteItem = folder.itemChanged(folderNoteItem)
			}
		}
	}

	openFolder(foldItem:CContainer) {
		this.foldStack.push(this.currentFold);
		this.currentFold = foldItem;
		this.currentFold.showFolder();
	}

	popFolder() {
		this.currentFold = this.foldStack.pop();
	}

	createCNoteBase(noteItem: NoteItem): CNoteBase {
		switch (noteItem.type) {
			default: throw Error("unknown type");
			case EnumNoteType.text: return this.createCNoteText();
			case EnumNoteType.textList: return this.createCNoteList(); 
			case EnumNoteType.textCheckable: return this.createCNoteCheckable(); 
			case EnumNoteType.folder: return createCFolder(this, noteItem);
			case EnumNoteType.task: return createCNoteTask(this, noteItem); 
			case EnumNoteType.group: debugger; throw Error("type group undefined");
			case EnumNoteType.groupFolder: return createCSpace(this); 
			case EnumNoteType.unit:  debugger; throw Error("type unit undefined");
			case EnumNoteType.assign: return new CNoteAssign(this);
		}
	}

	private createCNoteText(): CNoteText {
		let ret = new CNoteText(this);
		ret.createTextContent();
		return ret;
	}

	private createCNoteList(): CNoteText {
		let ret = new CNoteText(this);
		ret.createListContent();
		return ret;
	}

	private createCNoteCheckable(): CNoteText {
		let ret = new CNoteText(this);
		ret.createCheckableContent();
		return ret;
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

	async editNote(waiting:boolean, noteItem:NoteItem, caption:string, content:string, obj:any) {
		return await this.currentFold.editNote(waiting, noteItem, caption, content, obj);
	}

	async sendNoteTo(groupFolder:number, note:number, toList:number[]) {
		let tos = toList.join('|');
		await this.uqs.notes.SendNoteTo.submit({groupFolder, note, tos});
	}

	async hideNote(note:number, x:number) {
		await this.currentFold.hideNote(note, x);
	}

	renderNotesView() {
		return this.currentFold.renderListView();
	}

	renderHomeDropDown() {return this.renderView(VHomeDropdown)};
	renderSpaceDropDown() {return this.renderView(VSpaceDropdown)};

	showAddNoteTextPage = () => {
		let cNoteText = this.createCNoteText();
		cNoteText.showAddPage();
	}
	showAddNoteListPage = () => {
		let cNoteText = this.createCNoteList();
		cNoteText.showAddPage();
	}
	showAddNoteCheckablePage = () => {
		let cNoteText = this.createCNoteCheckable();
		cNoteText.showAddPage();
	}
	showAddMyFolderPage = () => {
		let cFolder = new CFolderMy(this);
		cFolder.init(undefined);
		cFolder.showAddPage();
	}

	showAddAssignPage = () => {
		let cNoteAssign = new CNoteAssign(this);
		cNoteAssign.init(undefined);
		cNoteAssign.showAddPage();
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

	showAddGroupPage = () => {
		let cGroup = this.newSub(CGroup);
		cGroup.showAddPage();
	}
}
