import React from 'react';
import { List } from "tonva";
import { VBasePage } from './VBasePage';
import { NoteItem } from '../model';

export class VList extends VBasePage {
	render() {
		return <List className="my-1" items={this.controller.notesPager} 
			item={{render: this.renderNote, key: this.noteKey, onClick: this.onNoteClick, className:'notes'}} />
	}

	private noteKey = (item: NoteItem) => {
		let {note} = item;
		if (typeof note === "object") return note.id;
		return note;
	}

	private renderNote = (item: NoteItem, index:number) => {
		let {type, unread} = item;
		let cNoteItem = this.controller.getCNoteItem(type);
		let cn = 'd-block rounded mx-2 my-1 bg-white border ';
		if (unread>0) cn += 'border-info shadow';
		return <div className={cn}>
			{cNoteItem.renderItem(item, index)}
		</div>;
	}

	private onNoteClick = async (item: NoteItem) => {
		let noteModel = await this.controller.getNote(item.note);
		item.unread = 0;
		this.controller.noteModel = noteModel;
		this.controller.noteItem = item;
		let {type} = item;
		let cNoteItem = this.controller.getCNoteItem(type);
		return cNoteItem.onClickItem(item, noteModel);
	}
}
