import React from 'react';
import { VBasePage } from "./VBasePage";

export class VActions extends VBasePage {
	header() {return '操作'}
	content() {
		return <div className="d-flex my-3 p-3 border bg-white">
			<button className="btn btn-primary" onClick={this.onSend}>发送</button>
			<button className="btn btn-primary ml-3" onClick={this.onAssign}>任务</button>
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
		this.closePage(3);
		this.controller.showSentPage();
	}

	private onAssign = () => {
		this.closePage();
		this.controller.cTaskNoteItem.showAssignTaskPage();
	}
}
