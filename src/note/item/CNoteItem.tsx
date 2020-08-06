import React from 'react';
import { NoteItem, NoteModel } from '../model';
import { CNote } from '../CNote';
import { CUqSub } from '../../tapp';

export abstract class CNoteItem extends CUqSub<CNote> {
	protected async internalStart() {}

	abstract renderItem(noteItem: NoteItem, index:number): JSX.Element;
	abstract onClickItem(noteItem: NoteItem, noteModel: NoteModel): void;

	/*
	// convert 可以在不同的继承中被重载
	// task 里面是把content parse 成json，放到obj里面	
	convert(noteItem: NoteItem): NoteItem {
		return noteItem;
	}
	*/

	/*
	// 数据转换，放到 CNoteItem中
	stringifyContent(obj:any):string {
		return JSON.stringify(obj);
			this.checkable === true?
			{
				check: true,
				itemKey: this.itemKey,
				items: this.items,
			}
			:
			{
				check: false,
				content: this.changedNoteContent || this.noteContent
			}
		);
	}
	*/

	parseContent(content:string):any {
		//if (this.parsed === true) return;
		//this.parsed = true;
		try {
			content = CNoteItem.replaceAll(content, '\n', '\\n');
			let obj = JSON.parse(content);
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
			return content;
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
