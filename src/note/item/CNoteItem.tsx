import React from 'react';
import { observable } from "mobx";
import { NoteItem, NoteModel, replaceAll } from '../model';
import { CNote } from '../CNote';
import { CUqSub } from '../../tapp';
import { VNoteItem } from './VNoteItem';

export interface CheckItem {
	key: number;
	text: string;
	checked?: boolean;
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
			this.checkType = Number(obj.check);
			if (this.checkType === 0) {
				this.noteContent = obj.content;
			}
			else {
				this.items.splice(0, this.items.length);
				this.itemKey = obj.itemKey;
				this.items.push(...obj.items);
			}
		}
	}

	@observable title: string;
	@observable noteContent: string;
	@observable checkType: number = 0;
	@observable items: CheckItem[] = [];
	@observable changedNoteContent: string;
	itemKey:number = 1;

	protected async internalStart() {}

	addItem(value:string):boolean {
		if (this.checkType === 1) {
			this.items.push({
				key: this.itemKey++,
				text: value,
				checked: false,
			});
		}
		else if (this.checkType === 2) {
			this.items.push({
				key: this.itemKey++,
				text: value,
			});
		}
		return false;
	}

	renderItem(index:number): JSX.Element {
		let vNoteItem = new VNoteItem(this);
		return vNoteItem.render();
	}

	abstract onClickItem(noteModel: NoteModel): void;

	protected stringifyContent() {
		let ret = JSON.stringify(this.buildObj());
		return ret;
	}

	protected buildObj():any {
		let obj = this.noteItem?{...this.noteItem.obj}:{};
		if (this.checkType === 0) {
			obj.check = this.checkType;
			obj.content = this.changedNoteContent || this.noteContent;
			delete obj.itemKey;
			delete obj.items;
		}
		else {
			obj.check = this.checkType;
			obj.itemKey = this.itemKey;
			obj.items = this.items;
			delete obj.content;
		}
		return obj;
	}

	// convertObj 可以在不同的继承中被重载
	convertObj(item:NoteItem):NoteItem {
		item.obj = this.parseContent(item.content);
		return item;
	}

	protected parseContent(content:string):any {
		try {
			if (!content) return undefined;
			return JSON.parse(content);
		}
		catch (err) {
			console.error(err);
			return undefined;
		}
	}
	
	protected renderNoteContent(content:string):JSX.Element {
		return <>{(content as string).split('\n').map((v, index) => {
			return <div key={index}>{v}</div>;
		})}</>;
	}

	showTo(backPageCount:number) {
		this.owner.showTo(this.noteItem, backPageCount);
	}

	onCheckableChanged(type:number) {
		let oldType = this.checkType;
		this.checkType = type;
		if (oldType === 0) {
			let content = this.changedNoteContent || this.noteContent;
			if (content) {
				this.items.splice(0, this.items.length);
				this.items.push(...content.split('\n').map((v, index) => {
					if (this.checkType === 1) {
						return {
							key: this.itemKey++,
							text: v,
							checked: false
						}
					}
					else {
						return {
							key: this.itemKey++,
							text: v,
						}
					}
				}));
			}
		}
		else {
			if (this.checkType === 0) {
				this.noteContent = this.items.map(v => v.text).join('\n');
			}
			else if (this.checkType === 1) {
				this.items.map(v => v.checked = false);
			}
			else if (this.checkType === 2) {
				this.items.map(v => delete v.checked);
			}
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
		if (this.noteItem) {
			this.noteItem.$update = new Date();
			if (this.title && this.title !== this.noteItem.caption) {
				this.noteItem.caption = this.title;
			}
		}
	}

	async AddNote() {
		let noteContent = this.stringifyContent();
		let ret = await this.owner.addNote(this.title, noteContent, this.buildObj());
		this.updateChange();
		return ret;
	}

	async AddComment(content:string) {		
		let ret = await this.uqs.notes.AddComment.submit({note:this.noteModel.id, content});
		let commentId = ret.comment;
		// 加入note界面，显示comment
	}
}
