import { NoteItem } from 'notes/model';
import React from 'react';
import { List } from 'tonva';
import { VNoteBaseView } from '../../noteBase';
import { CNoteAssign } from './CNoteAssign';
import { VAssignRelatives } from './VAssignRelatives';

export class VAssignView extends VNoteBaseView<CNoteAssign> {
	header() {
		return this.t('noteTask')
	}

	protected renderRelatives() {
		return this.renderVm(VAssignRelatives);
	}

	footer() {
		return this.renderFooter();
	}

	protected renderFooter() {
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-center">
			{this.renderShareButton()}
			{this.controller.cComments.renderWriteComment()}
		</div>;
	}

	protected renderContent() {
		return this.controller.cContent.renderViewContent();
	}

	protected renderViewBottom():JSX.Element {
		let {noteItem, noteModel} = this.controller;
		if (this.isMe(noteItem.owner) === false) return;

		let {spawn} = noteModel;
		let div:any;
		if (spawn.length === 0) {
			div = <div className="px-3 py-2">
				<button className="btn btn-primary" onClick={this.controller.showAssignTo}>分派</button>
			</div>;
		}
		else {
			div = <div className="my-3">
				<div className="d-flex px-3 py-2 align-items-end">
					<div className="small text-muted pt-2 pb-1">已分派</div>
					<button className="ml-auto btn btn-primary btn-sm" onClick={this.controller.showAssignTo}>追加分派</button>
				</div>
				<List items={spawn} item={{render: this.renderSpawn, className:'notes'}} />
			</div>;
		}
		return <div className="bg-light">{div}</div>;
	}

	private renderSpawn = (noteItem: NoteItem, index: number) => {
		let {owner, assigned} = noteItem;
		return <div className="px-3 py-2 bg-light border-top">
			{this.renderContact(owner as number, assigned)}
		</div>
	}
}
