import React from 'react';
import { observable } from "mobx";
import { NoteItem, NoteModel, replaceAll } from '../model';
import { CNote } from '../CNote';
import { CUqSub } from '../../tapp';

export interface CheckItem {
	key: number;
	text: string;
	checked: boolean;
}

export abstract class CNoteItem extends CUqSub<CNote> {
	noteItem: NoteItem;
	init(param: NoteItem):void {
		this.noteItem = param;
		if (!param) return;
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

	abstract renderItem(index:number): JSX.Element;
	abstract onClickItem(noteModel: NoteModel): void;

	/*
	// convert 可以在不同的继承中被重载
	// task 里面是把content parse 成json，放到obj里面	
	convert(noteItem: NoteItem): NoteItem {
		return noteItem;
	}
	*/

	stringifyContent() {
		return JSON.stringify(this.buildObj());
	}

	buildObj():any {
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
			content = CNoteItem.replaceAll(content, '\n', '\\n');
			let obj = content?JSON.parse(content):{};
			return obj;
			/*
			this.checkable = obj.check;
			if (this.checkable === true) {
				this.items.splice(0, this.items.length);
				this.itemKey = obj.itemKey;
				this.items.push(...obj.items);
			}
			else {
				this.noteContent = obj.content;
			}
			*/
		}
		catch (err) {
			console.error(err);
			return undefined;
		}
	}
	
	private static replaceAll(str:string, findStr:string, repStr:string):string {
		if (!str) return str;
		return str.split(findStr).join(repStr);
	}

	protected renderNoteContent(content:string):JSX.Element {
		return <>{(content as string).split('\n').map((v, index) => {
			return <div key={index}>{v}</div>;
		})}</>;
	}

	showTo(noteId:number) {
		this.owner.showTo(noteId)
	}
}
