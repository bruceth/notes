import React from 'react';
import { tv, FA } from "tonva";
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';
import { VNoteBase, CheckItem } from '../item';
import { CTextNoteItem } from './CTextNoteItem';
import { notesName } from '../../note';

export class VView extends VNoteBase<CTextNoteItem> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {return notesName}
	content() {
		return React.createElement(observer(() => {
			let {title, checkType} = this.controller;
			return <div className="my-2 mx-1 border rounded">
				<div className="bg-white">
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
		let left = this.renderFrom();
		let isMe = this.isMe(owner);
		let right:any;
		if (isMe === true) {
			left = undefined;
			right = <>
				{this.renderSendToButton()}
				{this.renderEditButton()}
			</>;
		}
		return <div className="py-2 pl-3 bg-light border-top d-flex">
			{left}
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
		await this.controller.onCheckChange(key, t.checked);
	}
}
