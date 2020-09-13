import React from 'react';
import { DropdownAction, FA } from 'tonva';
import { VFolder } from "../views/VFolder";
import { CSpace } from './CSpace';
import { VNotesDropDown } from '../../views';
import { CNotes } from 'notes/CNotes';

export class VSpaceView extends VFolder<CSpace> {
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
			}
		}
		let left: any;
		let vEditButton:any;
		if (this.isMe(this.controller.groupOwner)) {
			vEditButton = <span className="ml-3">{this.renderEditButton()}</span>;
		}
		let vMembers:any;
		let {memberCount} = this.controller;
		if (memberCount) {
			vMembers = <div className="ml-auto cursor-pointer" onClick={this.controller.showMembers}>
				<span>{memberCount}成员</span>
				<FA className="ml-2" name="angle-right" />
			</div>
		}
		return <div className="px-3 py-2 d-flex cursor-pointer" onClick={this.controller.showSpaceContent}>
			<FA className="mr-3 mt-1 text-warning" name="users" size="2x" />
			<div className="text-muted">
				{this.renderParagraphs(paragraphs)}
			</div>
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
