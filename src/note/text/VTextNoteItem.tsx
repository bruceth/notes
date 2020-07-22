import React from 'react';
import { CheckItem, VNoteBase } from '../item';
import { observer } from 'mobx-react';
import { tv, EasyTime, FA } from 'tonva';
import { CTextNoteItem } from './CTextNoteItem';

export class VTextNoteItem extends VNoteBase<CTextNoteItem> {
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
			return <div className="d-block border rounded m-2 bg-white">
				{caption && <div className="px-3 py-2"><b>{caption}</b></div>}
				<div>
					{
						this.checkable===false? 
						<div className="my-2">{this.renderContent()}</div>
						: this.renderItems()
					}
				</div>
				{divChanged}
			</div>;
		});
	}

	private renderItems() {
		return React.createElement(observer(() => {
			let uncheckedItems:CheckItem[] = [];
			let checkedItems:CheckItem[] = [];
			for (let ci of this.items) {
				let {checked} = ci;
				if (checked === true) checkedItems.push(ci);
				else uncheckedItems.push(ci);
			}			
			return <div className="">
				{uncheckedItems.map((v, index) => this.renderItem(v))}
				{
					checkedItems.length > 0 && <div className="border-top pt2">
						<div className="px-3 pt-2 small text-muted">{checkedItems.length}项完成</div>
						{checkedItems.map((v, index) => this.renderItem(v))}
					</div>
				}
			</div>;
		}));
	}

	private renderItem(v:CheckItem) {
		let {key, text, checked} = v;
		let cn = 'form-control-plaintext ml-3 ';
		let content: any;
		if (checked === true) {
			cn += 'text-muted';
			content = <del>{text}</del>;
		}
		else {
			content = text;
		}
		return <div key={key} className="d-flex mx-3 my-0 align-items-center form-group form-check">
			<input className="form-check-input mr-3 mt-0" type="checkbox"
				defaultChecked={checked}
				data-key={key}
				disabled={true} />
			<div className={cn}>{content}</div>
		</div>;
	}
}
