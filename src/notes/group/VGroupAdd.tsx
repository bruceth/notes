import React from "react";
import { CGroup } from "./CGroup";
import { List, FA } from "tonva";
import { VBasePage } from "../views/VBasePage";
import { Contact } from "model";
import { observable } from "mobx";
import { observer } from "mobx-react";

export class VGroupAdd extends VBasePage<CGroup> {
	@observable private anySelected:boolean = false;
	private list: List;

	protected get back(): 'close' | 'back' | 'none' {return 'close'}

	header() {return '新建群'}

	content() {
		let items = this.controller.cApp.contacts;
		let btnNext = React.createElement(observer(
			() => <button  disabled={!this.anySelected}
				className="btn btn-primary" 
				onClick={this.onNext}>下一步 <FA name='angle-right' /></button>
		));
		return <div>
			<List ref={v => this.list = v}
				items={items} 
				item={{render:this.renderContactItem, onSelect:this.onContactSelect}} />
			<div className="p-3 text-center">
				{btnNext}
			</div>
		</div>;
	}

	protected async onButtonSave(): Promise<void> {
		let caption: string = undefined;
		let content: string = undefined;
		let members: {member:number}[] = [];
		await this.controller.owner.rootFold.addGroup(caption, content, members);
		this.closePage();
		return;
	}

	private onNext = () => {
		let contacts = this.list.selectedItems;
		this.controller.contacts = contacts;
		this.openVPage(VGroupCaption);
	}

	private onContactSelect = (item:Contact, isSelected:boolean, anySelected:boolean):void => {
		this.anySelected = anySelected;
	}
}

class VGroupCaption extends VBasePage<CGroup> {
	private get defaultCaption():string {
		let d = new Date();
		return '群' + (d.getMonth() + 1) + '-' + (d.getDate());
	}
	private caption: string;

	header() {return '群名称'}
	content() {
		//let cn = 'px-3 py-2 cursor-pointer bg-white mt-1';
		return <div className="">
			<div className="text-muted small px-3 py-1 mt-2">群名称</div>
			<div className="px-3">
				<input 
					className="form-control" type="text" 
					placeholder={this.defaultCaption} 
					onChange={(e) => this.caption = e.target.value} />
			</div>

			<div className="text-muted small px-3 py-1 mt-2">群成员</div>
			<div className="border rounded p-3">
				{this.renderSelectedContact(this.controller.contacts)}
			</div>
			<div className="p-3 text-center">
				<button className="btn btn-success" onClick={this.onSave}>建群</button>
			</div>
		</div>;
	}

	private onSave = async () => {
		let caption:string;
		if (this.caption === undefined) {
			caption = this.defaultCaption;
		}
		else {
			caption = this.caption.trim();
			if (!caption) caption = this.defaultCaption;
		}
		let content:string = undefined;
		let members:{member:number}[] = this.controller.contacts.map(v => {return {member: v.contact}});
		await this.controller.owner.rootFold.addGroup(caption, content, members);
		this.closePage(2);
	}
}

