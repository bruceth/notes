import { observable } from "mobx";
import { CUqSub } from '../../tapp';
import { NoteItem, NoteModel, EnumNoteType } from '../model';
import { CNotes } from '../CNotes';

export abstract class CNoteBase extends CUqSub<CNotes> {
	disableFrom: boolean = false;
	@observable noteModel: NoteModel;
	@observable noteItem: NoteItem;

	@observable activeRelativeTab: string;
	get isContentChanged():boolean {return false;}; // {return this.cContent.changed}

	get groupFolder(): number {
		if (!this.noteItem)
			return undefined;
		let ret = this.noteItem.groupFolder;
		if (!ret && this.noteItem.type === EnumNoteType.groupFolder) {
			ret = this.noteItem.note;
		}
		return ret;
	}

	init(param: NoteItem): void {
		this.noteItem = param;
	}

	abstract get type():EnumNoteType;

	protected async internalStart() { }

	@observable caption: string;
	get captionChanged() {return this.caption !== this.noteItem?.caption;}

	abstract renderIcon(): JSX.Element;
	abstract renderDirItem(index: number): JSX.Element;
	abstract showViewPage():void;
	abstract showEditPage():void;
	abstract showAddPage():void;

	protected endContentInput():any {
		let obj = this.noteItem ? { ...this.noteItem.obj } : {};
		return obj;
	}

	/*
	// convertObj 可以在不同的继承中被重载
	convertObj(item: NoteItem): NoteItem {
		let {content} = item;
		if (content) {
			if (content[0] === '{') {
				item.obj = JSON.parse(content);
			}
		}
		return item;
	}
	*/

	async showTo(backPageCount: number) {
		await this.owner.showTo(this.noteItem, backPageCount);
	}

	async SetNote(showWaiting: boolean = true) {
		let obj = this.endContentInput();
		let noteContent = JSON.stringify(obj);
		await this.owner.editNote(showWaiting,
			this.noteItem,
			this.caption,
			noteContent,
			obj);
		this.updateChange();
	}

	protected updateChange() {
		if (!this.noteItem) {
			debugger;
			throw new Error('this.noteItem can not be undefined');
		}
		this.noteItem.$update = new Date();
		if (this.caption && this.caption !== this.noteItem.caption) {
			this.noteItem.caption = this.caption;
		}
		this.owner.itemChanged(this.noteItem);
	}

	// return the folder noteItem
	itemChanged(noteItem: NoteItem):NoteItem {
		//if (this.noteItem) {
		this.noteItem.$update = noteItem.$update;
		return this.noteItem;
		//}
	}

	async AddNote() {
		let obj = this.endContentInput();
		let noteContent = JSON.stringify(obj);
		let {folderId} = this.owner.currentFold;
		let ret = await this.owner.addNote(folderId, this.caption, noteContent, obj, this.type);
		if (this.noteItem) {
			this.updateChange();
		}
		return ret;
	}
}
