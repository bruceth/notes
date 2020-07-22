import React from 'react';
import { VBasePage } from "./VBasePage";
import { Contact } from 'model';
import { Page } from 'tonva';
import { NoteItem } from 'note/model';

export class VActions extends VBasePage {
	private noteId: number;
	private contacts: Contact[];

	init({contacts, noteId}:{contacts: Contact[], noteId:number}) {
		this.contacts = contacts;
		this.noteId = noteId;
	}

	header() {return '操作'}
	content() {
		return <div className="d-flex my-3 p-3 border bg-white">
			<button className="btn btn-primary" onClick={this.onSend}>发送</button>
			<button className="btn btn-primary ml-3" onClick={this.onAssign}>任务</button>
		</div>;
	}

	private onSend = async () => {
		let toList = this.contacts.map (v => {
			let {contact} = v;
			if (!contact) return undefined;
			if (typeof contact === 'object') return (contact as any).id;
			return contact;
		});
		await this.controller.sendNoteTo(this.noteId, toList);
		this.closePage(3);
		this.openPageElement(<Page header="已发送" back="close">
			<div className="m-5 border rounded bg-white">
				<div className="p-5 text-center border-bottom">已发送</div>
				<div className="text-center py-3">
					<button className="btn btn-outline-info" onClick={()=>this.backPage()}>返回</button>
				</div>
			</div>
		</Page>);
	}

	private onAssign = () => {
		let noteItem: NoteItem = undefined;
		this.controller.cTaskNoteItem.assignTask(noteItem, this.contacts);
	}
}
