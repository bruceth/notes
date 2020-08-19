import React from 'react';
import { List } from "tonva";
import { VBasePage } from './VBasePage';
import { CNoteItem } from 'note/item';

export class VList extends VBasePage {
	render() {
		return <List className="mt-1" items={this.controller.notesPager} 
			item={{render: this.renderNote, key: this.noteKey, onClick: this.onNoteClick, className:'notes'}} />
	}

	private noteKey = (item: CNoteItem) => {
		let note = item.noteItem.note;
		//if (typeof note === "object") return note.id;
		return note;
	}

	private renderNote = (item: CNoteItem, index:number) => {
		let {type, unread} = item.noteItem;
		let cn = 'd-block mb-2';
		// if (unread>0) cn += 'border-info shadow';
		return <div className={cn}>
			{item.renderItem(index)}
		</div>;
	}

	private onNoteClick = async (item: CNoteItem) => {
		let noteItem = item.noteItem;
		let noteModel = await this.controller.getNote(noteItem.note);
		noteItem.unread = 0;
		//this.controller.noteModel = noteModel;
		item.noteModel = noteModel;
		return item.onClickItem(noteModel);
	}
}
