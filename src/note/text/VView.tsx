import React from 'react';
import { tv, FA } from "tonva";
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';
import { VNoteBase, CheckItem } from '../item';
import { CTextNoteItem } from './CTextNoteItem';

export class VView extends VNoteBase<CTextNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return '记事'}
	content() {
		return React.createElement(observer(() => {
		let {note, caption, content} = this.controller.noteItem;
		//return tv(note, (values) => {
			//let {caption, content} = values;
			if (!this.controller.title) this.controller.title = caption;
			//this.parseContent(content);
			return <div className="my-2 mx-1 border rounded">
				<div className="bg-white">
					{caption && <div className="px-3 py-2 border-bottom">
						<div><b>{caption}</b></div>
					</div>}
					{
						this.controller.checkable===false? 
						<div className="py-3">{this.renderContent()}</div>
						: this.renderCheckItems()
					}
				</div>
				{this.renderBottomCommands()}
			</div>;
		//});
		}));
	}

	protected renderBottomCommands() {
		let {owner, assigned} = this.controller.noteItem;
		let left:any, right:any;
		let isMe = this.isMe(owner);
		if (isMe === true) {
			left = undefined;
			right = <>
				<button onClick={this.onSendNote}
					className="btn btn-outline-primary ml-3">
					发给
				</button>
				<div onClick={this.onEdit} className="px-3 py-2 cursor-pointer text-primary ml-3">
					<FA name="pencil-square-o" />
				</div>
			</>;
		}
		else {
			left = this.renderFrom(owner as number, assigned, 'px-2');
			right = undefined;
		}
		return <div className="py-2 px-3 bg-light border-top d-flex">
			{left}
			<div className="mr-auto" />
			{right}
		</div>;
	}

	private onEdit = () => {
		this.openVPage(VEdit);
	}

	private onSendNote = async () => {
		await this.controller.cApp.loadRelation();
		this.controller.showTo(this.controller.noteItem.note)
	}

	protected renderCheckItem(v:CheckItem, checkable:boolean) {
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
		return <label key={key} className="d-flex mx-3 my-0 align-items-center form-group form-check">
			<input className="form-check-input mr-3 mt-0" type="checkbox"
				defaultChecked={checked}
				onChange={this.onCheckChange}
				data-key={key}
				disabled={!checkable} />
			<div className={cn}>{content}</div>
		</label>;
	}

	protected renderCheckItems() {
		return React.createElement(observer(() => {
			let uncheckedItems:CheckItem[] = [];
			let checkedItems:CheckItem[] = [];
			for (let ci of this.controller.items) {
				let {checked} = ci;
				if (checked === true) checkedItems.push(ci);
				else uncheckedItems.push(ci);
			}			
			return <div className="">
				{uncheckedItems.map((v, index) => this.renderCheckItem(v, true))}
				{
					checkedItems.length > 0 && <div className="border-top mt-2 pt2">
						<div className="px-3 pt-2 small text-muted">{checkedItems.length}项完成</div>
						{checkedItems.map((v, index) => this.renderCheckItem(v, true))}
					</div>
				}
			</div>;
		}));
	}

	private onCheckChange = async (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		let item = this.controller.items.find(v => v.key === key);
		if (item) item.checked = t.checked;

		let noteContent = this.controller.stringifyContent();
		await this.controller.owner.setNote(false,
			this.controller.noteItem,
			this.controller.title, 
			noteContent,
			this.controller.buildObj());
	}
}
