import React from 'react';
import { CFolderNoteItem } from './CFolderNoteItem';
import { CNoteItem } from "../item";
import { VPage, List, FA } from 'tonva';

export class VFolder extends VPage<CFolderNoteItem> {
	afterBack() {
		this.controller.owner.popFolder();
	}
	header() {
		let {noteItem} = this.controller;
		if (noteItem) {
			return noteItem.caption;
		}
		return this.t('notes')
	}

	right() {
		return <button onClick={()=>this.controller.owner.showAddNotePage(this.controller.folderId)} className="btn btn-success btn-sm mr-1">
			<FA name="plus" /> {this.t('notes')}
		</button>;
	}

	content() {
		return <List className="my-1" items={this.controller.notesPager} 
			item={{render: this.renderNote, key: this.noteKey, onClick: this.onNoteClick, className:'notes'}} />
	}

	renderListView() {
		return this.content();
	}

	private noteKey = (item: CNoteItem) => {
		let note = item.noteItem.note;
		//if (typeof note === "object") return note.id;
		return note;
	}

	private renderNote = (item: CNoteItem, index:number) => {
		let {type, unread} = item.noteItem;
		let cn = 'd-block rounded mx-2 my-1 border';
		if (unread>0) cn += 'border-info shadow';
		return <div className={cn}>
			{item.renderItem(index)}
		</div>;
	}

	private onNoteClick = async (item: CNoteItem) => {
		let noteItem = item.noteItem;
		let noteModel = await this.controller.getNote(noteItem.note);
		noteItem.unread = 0;
		item.noteModel = noteModel;
		return item.onClickItem(noteModel);
	}
}
