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

	protected top() {
		let {noteItem, notesPager} = this.controller;
		if (!noteItem) return;

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
		return <div className="d-flex mx-3 py-3">
			<FA className="mr-3 text-warning" name={noteItem.toCount > 0 ? "folder-open":"folder"} size="3x" />
			<div className="small text-muted">{this.renderParagraphs(topContent)}</div>
			<div className="ml-auto align-self-center" 
					onClick={(e)=>{e.stopPropagation(); this.controller.onClickEllipsis()}}>
					<FA name="ellipsis-h" />
			</div>
		</div>;
	}

	content() {
		let {notesPager} = this.controller;
		return <div>
			{this.top()}
			<List className="" 
				items={notesPager} 
				item={{render: this.renderNote, key: this.noteKey, onClick: this.onNoteClick, className:'notes'}} />
		</div>
	}

	renderListView() {
		return this.content();
	}

	private noteKey = (item: CNoteItem) => {
		let note = item.noteItem.note;
		return note;
	}

	private renderNote = (item: CNoteItem, index:number) => {
		return <div className="d-block mb-2 bg-white">{item.renderItem(index)}</div>;
	}

	private onNoteClick = async (item: CNoteItem) => {
		let noteItem = item.noteItem;
		let noteModel = await this.controller.getNote(noteItem.note);
		noteItem.unread = 0;
		item.noteModel = noteModel;
		return item.onClickItem(noteModel);
	}
}
