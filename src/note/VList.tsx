import React from 'react';
import { View, List, tv, Page, EasyTime } from "tonva";
import { CNote } from "./CNote";
import { VEditRNotePage } from "./VEditRNotePage";

export class VList extends View<CNote> {
	render() {
		return <List items={this.controller.notesPager} 
			item={{render: this.renderNote, key: this.anchorKey, onClick: this.onAnchorClick}} />
	}

	private anchorKey = (item:any) => item.anchor;

	private renderNote = (item:any, index:number) => {
		let {anchor, owner, rNote} = item;
		let tvRenderNote = (values:any) => {
			let {caption, content, $create, $update} = values;
			let divChanged:any = undefined;
			let create:Date = $create;
			let update:Date = $update;
			if (create && update) {
				let time:Date, pre:string;
				if (update.getTime() - create.getTime() > 60*1000) {
					pre = '修改: ';
					time = update;
				}
				else {
					time = create;
				}
				divChanged = <div className="text-right small text-muted"><small>{pre}<EasyTime date={time} /></small></div>;
			}
			return <div className="px-3 py-2 d-block border rounded m-2 bg-transparent">
				{caption && <div className="pb-2"><b>{caption}</b></div>}
				<div>{(content as string).split('\n').map(v => {
					return <div>{v}</div>;
				})}</div>
				{divChanged}
			</div>;
		}
		//return <div className="px-3 py-2">anchor={tv(anchor)} owner={tv(owner)} note={tv(note)}</div>;
		return tv(rNote, tvRenderNote);
	}

	private onAnchorClick = (item:any) => {
		this.openVPage(VEditRNotePage, item);
	}
}
