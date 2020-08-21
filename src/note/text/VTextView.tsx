import React from 'react';
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';
import { VNoteView, CheckItem } from '../item';
import { CTextNoteItem } from './CTextNoteItem';

export class VTextView extends VNoteView<CTextNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return this.t('notes')}

	content() {
		return React.createElement(observer(() => {
			let {title} = this.controller;
			return <div className="">
				<div className="bg-white">
					{this.renderTop()}
					{title && <div className="px-3 py-2 border-bottom">
						<div><b>{title}</b></div>
					</div>}
					{this.renderContent()}
				</div>
				{this.renderBottomCommands()}
				{this.renderRelatives()}
			</div>;
		}));
	}

	protected renderBottomCommands() {
		let {owner} = this.controller.noteItem;
		let isMe = this.isMe(owner);
		let right:any;
		if (isMe === true) {
			right = <>
				{this.renderEditButton()}				
			</>;
		}
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-end">
			{this.renderSendToButton()}
			{this.renderCommentButton()}
			<div className="mr-auto" />
			{right}
		</div>;
	}

	protected onEdit() {
		this.openVPage(VEdit);
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
/*
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
					checkedItems.length > 0 && <div className="border-top mt-2 py-2">
						<div className="px-3 pt-2 small text-muted">{checkedItems.length}项完成</div>
						{checkedItems.map((v, index) => this.renderCheckItem(v, true))}
					</div>
				}
			</div>;
		}));
	}
*/
	private onCheckChange = async (evt:React.ChangeEvent<HTMLInputElement>) => {
		let t = evt.currentTarget;
		let key = Number(t.getAttribute('data-key'));
		await this.controller.onCheckChange(key, t.checked);
	}
}
