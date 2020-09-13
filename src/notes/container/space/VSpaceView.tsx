import React from 'react';
import { DropdownAction, FA, Muted } from 'tonva';
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
		let vMembers:any;
		let {memberCount} = this.controller;
		if (memberCount) {
			vMembers = <div className="ml-auto cursor-pointer" onClick={this.controller.showMembers}>
				<span>{memberCount}成员</span>
				<FA className="ml-2" name="angle-right" />
			</div>
		}
		return <div className="p-3 d-flex">
			<Muted>[群说明:无]</Muted>
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
