import React from 'react';
import { VBasePage } from "./VBasePage";
import { LMR, FA } from 'tonva';
import { CheckItem } from 'note/item';

export class VActions extends VBasePage {
	protected backPageCount = 3;

	init(param?:any):void {
		if (param) {
			this.backPageCount = Number(param);
		}	
	}

	header() {return '操作'}
	content() {
		let {noteItem} = this.controller;
		let obj = noteItem.obj;
		let checkType = Number(obj?.check);
		let cn = 'px-3 py-2 cursor-pointer bg-white mt-1';
		return <div className="">
			<div className="text-muted small px-3 py-1 mt-2">收件人</div>
			<div className="border rounded p-3 mb-3">
				{this.controller.contacts.map((c, index) => {
					let {contact, assigned} = c;
					return <span key={index} className="mr-3">{this.renderContact(contact, assigned)}</span>;
				})}
			</div>
			<div className={cn} onClick={this.onSend}>
				分享内容
			</div>
			{
				(checkType === 1) &&
				<div className={cn} onClick={this.onAssign}>
					<LMR right={<FA name="angle-right" />}>
						分派任务
					</LMR>
				</div>
			}
		</div>;
	}

	private onSend = async () => {
		let {contacts, noteItem} = this.controller;
		let toList = contacts.map (v => {
			let {contact} = v;
			if (!contact) return undefined;
			if (typeof contact === 'object') return (contact as any).id;
			return contact;
		});
		await this.controller.sendNoteTo(noteItem.note, toList);
		this.closePage(this.backPageCount);
		this.controller.showSentPage();
	}

	private onAssign = () => {
		this.closePage();
		this.controller.showAssignTaskPage();
	}
}
