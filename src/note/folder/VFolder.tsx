import React from 'react';
import { CFolderNoteItem } from './CFolderNoteItem';
import { CNoteItem, VNoteView } from "../item";
import { List, FA } from 'tonva';

export class VFolder extends VNoteView<CFolderNoteItem> {
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
		let {noteItem, notesPager} = this.controller;
		let top:any;
		if (noteItem) {
			let topContent: string;
			let {content: contentString} = noteItem;
			let json = JSON.parse(contentString);
			if (json) {
				let {content} = json;
				topContent = (content as string)?.trimEnd();
			}
			else {
				topContent = "整理小单";
			}
			top = <div className="d-flex mx-3 pt-2">
				<FA className="mr-3 text-warning" name="folder" size="3x" />
				<div className="small text-muted">{this.renderParagraphs(topContent)}</div>
			</div>;
		}
		return <div>
			{top}
			<List className="mt-1" 
				items={notesPager} 
				item={{render: this.renderNote, key: this.noteKey, onClick: this.onNoteClick, className:'notes'}} />
		</div>
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
		let cn = 'd-block mb-2 ';
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
