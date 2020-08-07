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

//const backSlashNT = '\\\n\t';
//const backSlashCode = backSlashNT.charCodeAt(0);
//const backSlashN = backSlashNT.charCodeAt(1);
//const backSlashT = backSlashNT.charCodeAt(2);

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
		let ret = JSON.stringify(this.buildObj());
		return ret;
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
			//if (!content) return content;
			//content = CNoteItem.replaceAll(content, '\n', '\\n');
			//content = CNoteItem.replaceAll(content, '\\', '\\\\');
			//let c = CNoteItem.replaceBacksplash(content);
			return JSON.parse(content);
			//return obj;
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
			return content;
		}
	}
	/*
	private static replaceAll(str:string, findStr:string, repStr:string):string {
		if (!str) return str;
		return str.split(findStr).join(repStr);
	}
	*/

	//content = CNoteItem.replaceAll(content, '\n', '\\n');
	//content = CNoteItem.replaceAll(content, '\\', '\\\\');
	/*
	private static replaceBacksplash(str:string):string {
		if (!str) return str;
		let ret = '', p = 0;
		let len = str.length;
		for (let i=0; i<len; i++) {
			let c = str.charCodeAt(i);
			let ch:string;
			switch (c) {
				case backSlashN: ch = '\\n'; break;
				case backSlashT: ch = '\\t'; break;
				case backSlashCode: ch = '\\\\'; break;
				default: continue;
			}
			ret += str.substring(p, i) + ch;
			p = i+1;
		}
		ret += str.substring(p, len);
		return ret;
	}
	*/

	protected renderNoteContent(content:string):JSX.Element {
		return <>{(content as string).split('\n').map((v, index) => {
			return <div key={index}>{v}</div>;
		})}</>;
	}

	showTo(noteId:number) {
		this.owner.showTo(noteId)
	}
}
