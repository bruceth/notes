import React from 'react';
import { List, tv, EasyTime, FA } from "tonva";
import { VEditNotePage } from "./VEditNotePage";
import { VNote } from './VNote';

export class VList extends VNote {
	render() {
		return <List items={this.controller.notesPager} 
			item={{render: this.renderNote, key: this.noteKey, onClick: this.onNoteClick}} />
	}

	private noteKey = (item:any) => {
		let {note} = item;
		if (typeof note === "object") return note.id;
		return note;
	}

	private renderNote = (item:any, index:number) => {
		let {owner, note} = item;
		let tvRenderNote = (values:any) => {
			let {caption, content, $create, $update} = values;
			let divChanged:any = undefined;
			let create:Date = $create;
			let update:Date = $update;
			if (create && update) {
				let time:Date, action:any;
				if (update.getTime() - create.getTime() > 60*1000) {
					action = <FA name="pencil-square-o" />;
					time = update;
				}
				else {
					time = create;
				}
				divChanged = <div className="text-right small text-muted">
					<small>
						{action}
						<span className="text-info"><EasyTime date={time} /></span>
					</small>
				</div>;
			}
			return <div className="px-3 py-2 d-block border rounded m-2 bg-transparent">
				{caption && <div className="pb-2"><b>{caption}</b></div>}
				<div>{(content as string).split('\n').map((v, index) => {
					return <div key={index}>{v}</div>;
				})}</div>
				{divChanged}
			</div>;
		}
		return tv(note, tvRenderNote);
	}

	private onNoteClick = (item:any) => {
		this.openVPage(VEditNotePage, item);
	}
}
