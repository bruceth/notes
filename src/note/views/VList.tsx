import React from 'react';
import { List } from "tonva";
import { VBasePage } from './VBasePage';
import { NoteItem } from '../model';

export class VList extends VBasePage {
	render() {
		return <List items={this.controller.notesPager} 
			item={{render: this.renderNote, key: this.noteKey, onClick: this.onNoteClick}} />
	}

	private noteKey = (item: NoteItem) => {
		let {note} = item;
		if (typeof note === "object") return note.id;
		return note;
	}

	private renderNote = (item: NoteItem, index:number) => {
		let {type} = item;
		let cNoteItem = this.controller.getCNoteItem(type);
		return cNoteItem.renderItem(item, index);
	}

	private onNoteClick = (item: NoteItem) => {
		let {type} = item;
		let cNoteItem = this.controller.getCNoteItem(type);
		return cNoteItem.onClickItem(item);
	}
}
