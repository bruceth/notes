import React from 'react';
import { DropdownAction, FA } from 'tonva';
import { VFolder } from "../views/VFolder";
import { CSpace } from './CSpace';
import { VNotesDropDown } from '../../views';
import { CNotes } from 'notes/CNotes';
import { observer } from 'mobx-react';

export class VSpaceView extends VFolder<CSpace> {
	header() {
		return React.createElement(observer(() => {
			let {noteItem} = this.controller;
			let caption = noteItem ? noteItem.caption : this.t('noteSpace');
			return <div>{caption}</div>
		}));
	}

	right() {
		let dd = new VSpaceDropdown(this.controller.owner, this.controller);
		return dd.render();
	}

	protected top():JSX.Element {
		let {noteItem} = this.controller;
		if (!noteItem) return;

		let paragraphs: string = '空间';
		let {content: contentString} = noteItem;
		if (contentString) {
			let json = JSON.parse(contentString);
			if (json) {
				let {content} = json;
				paragraphs = (content as string)?.trimEnd();
				if (paragraphs.length > 50) {
					paragraphs = paragraphs.substr(0, 50) + '...';
				}
			}
		}
		let left: any;
		let vEditButton:any;
		if (this.isMe(this.controller.groupOwner)) {
			vEditButton = <div className="ml-3">{this.renderEditButton()}</div>;
		}
		left = <>
			<FA className="mr-3 text-warning py-3" name="users" size="2x" />
			<div className="small text-muted py-3">{this.renderParagraphs(paragraphs)}</div>
			{vEditButton}
		</>;
		let vMembers:any;
		let {memberCount} = this.controller;
		if (memberCount) {
			vMembers = <div className="ml-auto cursor-pointer" onClick={this.controller.showMembers}>
				<span>{memberCount}成员</span>
				<FA className="ml-2" name="angle-right" />
			</div>
		}
		return <div className="p-3 d-flex align-items-center">
			{left}
			{vMembers}
		</div>;
	}
}

class  VSpaceDropdown extends VNotesDropDown {
	private cSpace: CSpace;
	
	constructor(cNotes:CNotes, cSpace: CSpace) {
		super(cNotes);
		this.cSpace = cSpace;
	}
	protected get dropdownActions(): DropdownAction[] {
		let addMember = {
			icon:'user-o', 
			caption:this.t('成员增减'), 
			action: this.cSpace.showAddMember,
			iconClass: 'text-success'
		};
		return [this.text, this.list, this.checkable, this.task, this.folder, undefined, addMember];
	}
}
