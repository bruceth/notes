import React from "react";
import { VPage } from "tonva";
import { NoteItem } from "../model";
import { observable } from "mobx";
import { CNoteItem } from "./CNoteItem";

export interface CheckItem {
	key: number;
	text: string;
	checked: boolean;
}

export abstract class VNoteBase<T extends CNoteItem> extends VPage<T> {
	protected parsed: boolean = false;

	protected param: NoteItem;
	init(param: NoteItem):void {this.param = param;}

	@observable protected title: string;
	@observable protected noteContent: string;
	@observable protected checkable: boolean = false;
	@observable protected items: CheckItem[] = [];
	@observable protected changedNoteContent: string;
	protected itemKey:number = 1;

	protected stringifyContent() {
		return JSON.stringify(
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

	protected parseContent(content:string) {
		if (this.parsed === true) return;
		this.parsed = true;
		try {
			content = replaceAll(content, '\n', '\\n');
			let obj = JSON.parse(content);
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
		catch (err) {
			console.error(err);
			this.noteContent = content;
		}
	}

	protected renderContent() {
		return <div className="px-3">{(this.noteContent).split('\n').map((v, index) => {
			let c = !v? <>&nbsp;</>: v;
			return <div key={index}>{c}</div>;
		})}</div>;
	}
}

function replaceAll(str:string, findStr:string, repStr:string):string {
	if (!str) return str;
	return str.split(findStr).join(repStr);
}
