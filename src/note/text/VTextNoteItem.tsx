import React from 'react';
import { VNoteBase } from '../item';
import { tv, EasyTime, FA } from 'tonva';
import { CTextNoteItem } from './CTextNoteItem';

export class VTextNoteItem extends VNoteBase<CTextNoteItem> {
	render() {
		let {note, owner, assigned, caption, content, $create, $update} = this.param;
		//return tv(note, (values) => {
		//	let {caption, content, $create, $update} = values;
			if (!this.title) this.title = caption;
			//this.parseContent(content);
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
				divChanged = <div className="small text-muted">
					<small>
						{action}
						<span className="text-info"><EasyTime date={time} /></span>
					</small>
				</div>;
			}
			let divFrom:any;
			if (this.isMe(owner) === false) {
				divFrom = this.renderFrom(owner as number, assigned);
			}
			return <div className="d-block">
				{caption && <div className="px-3 py-2"><b>{caption}</b></div>}
				<div>
					{
						this.checkable===false? 
						<div className="my-2">{this.renderContent()}</div>
						: this.renderCheckItems(this.checkable)
					}
				</div>
				{
					(divFrom || divChanged) && <div className="d-flex align-items-center px-3 py-1">
						{divFrom}
						<div className="mr-auto" />
						{divChanged}
					</div>
				}
			</div>;
		//});
	}
}
