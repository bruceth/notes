import React from "react";
import { VPage, User, Image, UserView, BoxId } from "tonva";
import { NoteItem, replaceAll } from "../model";
import { observable } from "mobx";
import { CNoteItem } from "./CNoteItem";
import { observer } from "mobx-react";
import { Contact } from "model";

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

	protected renderItems() {
		return React.createElement(observer(() => {
			let uncheckedItems:CheckItem[] = [];
			let checkedItems:CheckItem[] = [];
			for (let ci of this.items) {
				let {checked} = ci;
				if (checked === true) checkedItems.push(ci);
				else uncheckedItems.push(ci);
			}			
			return <div className="">
				{uncheckedItems.map((v, index) => this.renderItem(v))}
				{
					checkedItems.length > 0 && <div className="border-top pt2">
						<div className="px-3 pt-2 small text-muted">{checkedItems.length}项完成</div>
						{checkedItems.map((v, index) => this.renderItem(v))}
					</div>
				}
			</div>;
		}));
	}

	protected renderItem(v:CheckItem) {
		let {key, text, checked} = v;
		let cn = 'form-control-plaintext ml-3 ';
		let content: any;
		if (checked === true) {
			cn += 'text-muted';
			content = <del>{text}</del>;
		}
		else {
			content = text;
		}
		return <div key={key} className="d-flex mx-3 my-0 align-items-center form-group form-check">
			<input className="form-check-input mr-3 mt-0" type="checkbox"
				defaultChecked={checked}
				data-key={key}
				disabled={true} />
			<div className={cn}>{content}</div>
		</div>;
	}

	protected renderContact = (userId:number, assigned:string) => {
		let renderUser = (user:User) => {
			let {name, nick, icon} = user;
			return <>
				<Image className="w-1-5c h-1-5c mr-2" src={icon} />
				{name} {nick} {assigned}
			</>
		}
		return <UserView user={userId as number} render={renderUser} />;
	}
}
