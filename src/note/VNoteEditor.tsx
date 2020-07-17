import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { VToPage } from './VToPage';
import { VNote } from './VNote';

export abstract class VNoteEditor extends VNote {
	private currentNoteId:number;

	protected param:any;
	init(param?:any):void {this.param = param;}

	protected initTitle: string;
	@observable protected title: string;
	protected onTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.title = evt.target.value.trim();
	}

	protected initNoteContent: string;
	@observable protected noteContent: string;
	protected onContentChange = (evt:React.ChangeEvent<HTMLTextAreaElement>) => {
		this.noteContent = evt.target.value;
	}

	@computed get saveDisabled():boolean {
		return (this.title === undefined && this.noteContent === undefined);
	}

	abstract getSendDisabled():boolean;

	@computed get sendDisabled():boolean {
		return this.getSendDisabled();
	}
	
	protected abstract saveNote(): Promise<number>;

	private onButtonSave = async (): Promise<void> => {
		let noteId = await this.saveNote();
		this.currentNoteId = noteId;
		this.closePage();
		return;
	}

	protected renderButtonSave() {
		return observer(() => <button onClick={this.onButtonSave}
			className="btn btn-primary" disabled={this.saveDisabled}>
			保存
		</button>);
	}

	protected renderButtonSend() {
		return observer(() => <button onClick={this.onSendNote} 
			className="btn btn-outline-primary ml-3" disabled={this.sendDisabled}>
			发送
		</button>);
	}

	protected renderEditBoxBottom() {
		return <div className="py-2 px-3 bg-light border-top d-flex">
			<div className="mr-auto" />
			{React.createElement(this.renderButtonSave())}
			{React.createElement(this.renderButtonSend())}
		</div>
	}

	private onSendNote = async () => {
		let noteId = await this.saveNote();
		this.currentNoteId = noteId;
		this.openVPage(VToPage, this.currentNoteId);
	}
}
