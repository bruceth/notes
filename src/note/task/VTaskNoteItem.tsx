import React from 'react';
import { CTaskNoteItem } from "./CTaskNoteItem";
import { tv, FA, EasyTime } from "tonva";
import { VNoteBase } from '../item';

export class VTaskNoteItem extends VNoteBase<CTaskNoteItem> {
	render() {
		let {note} = this.param;
		return tv(note, (values) => {
			let {caption, content, $create, $update} = values;
			if (!this.title) this.title = caption;
			this.parseContent(content);
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
				divChanged = <div className="text-right small text-muted px-3 pb-1">
					<small>
						{action}
						<span className="text-info"><EasyTime date={time} /></span>
					</small>
				</div>;
			}
			return <div className="d-block">
				{caption && <div className="px-3 py-2 text-success"><b>{caption}</b></div>}
				<div>
					{
						this.checkable===false? 
						<div className="py-3">{this.renderContent()}</div>
						: this.renderItems()
					}
				</div>
				{divChanged}
			</div>;
		});
	}
}
