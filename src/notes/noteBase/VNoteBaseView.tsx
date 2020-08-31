import React from 'react';
import { observer } from 'mobx-react';
import { VNoteBase } from "./VNoteBase";
import { CNoteBase } from "./CNoteBase";
import { VRelatives } from './VRelatives';

export class VNoteBaseView<T extends CNoteBase> extends VNoteBase<T> {
	protected renderRelatives() {
		return this.renderVm(VRelatives);
	}

	renderListItem() {
		return React.createElement(observer(() => {
			let {caption} = this.controller.noteItem;
			let divToCount = this.renderToCount();
			let divSpawnCount = this.renderSpawnCount();
			let divComment = this.renderCommentFlag();
			let divBottom:any;
			if (divToCount || divSpawnCount || divComment) {
				divBottom = <div className="d-flex align-items-center px-3 mb-1">
					{divToCount}
					{divSpawnCount}
					{divComment}
					<div className="mr-auto" />
				</div>;
			}

			return <div className="d-block bg-white">
				{this.renderItemTop()}
				<div className="py-2">
					{caption && <div className="px-3 my-2"><b>{caption}</b></div>}
					{this.renderItemContent()}
				</div>
				{divBottom}
			</div>;
		}));
	}

}

/*
export class VCheckableNoteBaseView<T extends CCheckableNoteBase> extends VNoteBaseView<T> {
	protected renderCheckableContentBase(checkable:boolean) {
		let {checkType} = this.controller;
		return <div>
		{
			checkType === EnumCheckType.text || checkType === EnumCheckType.folder ? 
				this.renderContentText()
				: 
				checkType === EnumCheckType.checkable ? 
					this.renderCheckItems(checkable)
					:
					this.renderContentList()
		}
		</div>;
	}
	protected renderContentList() {
		return React.createElement(observer(() => {
			let items = this.controller.items;
			return <ul className="note-content-list px-3 my-2">
				{items.map((v, index) => {
					let {key, text} = v;
					return <li key={key} className="ml-3 pt-1 pb-2 align-items-center">
						{text}
					</li>
				})}
			</ul>;
		}));
	}

	protected renderCheckItems(checkable:boolean) {
		return React.createElement(observer(() => {
			let uncheckedItems:CheckItem[] = [];
			let checkedItems:CheckItem[] = [];
			for (let ci of this.controller.items) {
				let {checked} = ci;
				if (checked === true) checkedItems.push(ci);
				else uncheckedItems.push(ci);
			}
			let doneItems:any;			
			let checkedCount = checkedItems.length;
			if (checkedCount > 0) {
				let cn:string, doneTop:any;
				if (checkable===true) {
					cn = 'border-top py-2';
					doneTop = <div className="px-3 pt-2 small text-muted">{checkedCount}项完成</div>;
				}
				doneItems = <div className={cn}>
					{doneTop}
					{checkedItems.map((v, index) => this.renderCheckItem(v, checkable))}
				</div>;
			}
			return <div className="mb-2">
				{uncheckedItems.map((v, index) => this.renderCheckItem(v, checkable))}
				{doneItems}
			</div>;
		}));
	}

	protected renderCheckItem(v:CheckItem, checkable:boolean) {
		let {key, text, checked} = v;
		let cn = 'ml-3 ';
		let content: any;
		let icon: string;
		if (checked === true) {
			cn += 'text-muted ';
			content = <del>{text}</del>;
			icon = 'check-square';
		}
		else {
			content = text;
			icon = 'square-o';
		}
		if (checkable === true) {
			return <div key={key} className="d-flex mx-3 align-items-center form-check">
				<input className="form-check-input mr-3 mt-0" type="checkbox"
					defaultChecked={checked}
					data-key={key} />
				<div className={'form-control-plaintext ' + cn}>{content}</div>
			</div>;
		}
		else {
			return <div key={key} className="d-flex mx-3 align-items-center">
				<FA name={icon} />
				<div className={'py-1 ' + cn}>{content}</div>
			</div>;
		}
	}
}
*/