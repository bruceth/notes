import React from 'react';
import { observable } from "mobx";
import { NoteItem, NoteModel, replaceAll } from '../model';
import { CNote } from '../CNote';
import { CUqSub } from '../../tapp';
import { VNoteItem } from './VNoteItem';

export interface CheckItem {
	key: number;
	text: string;
	checked: boolean;
}

export abstract class CNoteItem extends CUqSub<CNote> {
	noteModel: NoteModel;
	@observable noteItem: NoteItem;
	
	init(param: NoteItem):void {
		this.noteItem = param;
		if (!param) return;
		this.title = param.caption;
		let {obj} = param;
		if (obj) {
			this.checkable = obj.check;
			if (this.checkable === true) {
				this.items.splice(0, this.items.length);
				this.itemKey = obj.itemKey;
				this.items.push(...obj.items);
			}
			else {
				this.noteContent = obj.content;
			}
		}
	}

	@observable title: string;
	@observable noteContent: string;
	@observable checkable: boolean = false;
	@observable items: CheckItem[] = [];
	@observable changedNoteContent: string;
	itemKey:number = 1;

	protected async internalStart() {}

	renderItem(index:number): JSX.Element {
		let vNoteItem = new VNoteItem(this);
		return vNoteItem.render();
	}

	abstract onClickItem(noteModel: NoteModel): void;

	private stringifyContent() {
		let ret = JSON.stringify(this.buildObj());
		return ret;
	}

	private buildObj():any {
		let obj = this.noteItem?{...this.noteItem.obj}:{};
		if (this.checkable) {
			obj.check = true;
			obj.itemKey = this.itemKey;
			obj.items = this.items;
			delete obj.content;
		}
		else {
			obj.check = false;
			obj.content = this.changedNoteContent || this.noteContent;
			delete obj.itemKey;
			delete obj.items;
		}
		return obj;
	}

	parseContent(content:string):any {
		try {
			if (!content) return undefined;
			return JSON.parse(content);
		}
		catch (err) {
			console.error(err);
			return undefined;
		}
	}
	
	/*
	private static replaceAll(str:string, findStr:string, repStr:string):string {
		if (!str) return str;
		return str.split(findStr).join(repStr);
	}
	*/

	protected renderNoteContent(content:string):JSX.Element {
		return <>{(content as string).split('\n').map((v, index) => {
			return <div key={index}>{v}</div>;
		})}</>;
	}

	showTo() {
		this.owner.showTo(this.noteItem);
	}

	onCheckableChanged(checkable:boolean) {
		this.checkable = checkable;
		if (this.checkable === true) {
			let content = this.changedNoteContent || this.noteContent;
			if (content) {
				this.items.splice(0, this.items.length);
				this.items.push(...content.split('\n').map((v, index) => {
					return {
						key: this.itemKey++,
						text: v,
						checked: false
					}
				}));
			}
		}
		else {
			this.noteContent = this.items.map(v => v.text).join('\n');
		}
		this.changedNoteContent = undefined;
	}

	async onCheckChange(key:number, checked:boolean) {
		let item = this.items.find(v => v.key === key);
		if (item) item.checked = checked;
		await this.SetNote(false);
	}

	async SetNote(waiting:boolean) {
		let noteContent = this.stringifyContent();
		await this.owner.setNote(waiting,
			this.noteItem,
			this.title, 
			noteContent,
			this.buildObj());
		this.updateChange();
	}

	private updateChange() {
		if (this.changedNoteContent) {
			this.noteContent = this.changedNoteContent;
			this.changedNoteContent = undefined;
		}
		if (this.title && this.title !== this.noteItem.caption) {
			this.noteItem.caption = this.title;
		}
	}

	async AddNote() {
		let noteContent = this.stringifyContent();
		await this.owner.addNote(this.title, noteContent, this.buildObj());
		this.updateChange();
	}
}
