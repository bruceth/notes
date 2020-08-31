import React from 'react';
import { View, DropdownActions, DropdownAction } from "tonva";
import { CNotes } from "../CNotes";
import { EnumContentType } from 'notes/components';

abstract class VNotesDropDown extends View<CNotes> {
	private actionAddNote = () => {
		this.controller.showAddNotePage(EnumContentType.text);
	}

	private actionAddList = () => {
		this.controller.showAddNotePage(EnumContentType.list);
	}

	private actionCheckable = () => {
		this.controller.showAddNotePage(EnumContentType.checkable);
	}

	private actionAddFolder = () => {
		this.controller.showAddNotePage(EnumContentType.folder);
	}

	private actionAddAssign = () => {
		this.controller.showAddAssignPage();
	}

	private actionAddGroup = () => {
		this.controller.showAddGroupPage();
	}

	
	protected text = {icon:'file-o', caption:this.t('noteText'), action: this.actionAddNote, captionClass: 'text-primary'};
	protected list = {icon:'list', caption:this.t('noteList'), action: this.actionAddList};
	protected checkable = {icon:'check-square-o', caption:this.t('noteCheckable'), action: this.actionCheckable};
	protected task = {icon:'hand-pointer-o', caption:this.t('noteTask'), action: this.actionAddAssign, iconClass: 'text-primary'};
	protected folder = {icon:'folder', caption:this.t('noteFolder'), action: this.actionAddFolder, iconClass: 'text-warning'};
	protected space = {icon:'users', caption:this.t('noteSpace'), action: this.actionAddGroup, iconClass: 'text-danger'};

	protected abstract get dropdownActions(): DropdownAction[];

	render() {
		return <DropdownActions actions={this.dropdownActions} icon="plus" itemIconClass="text-info"
				className="cursor-pointer btn btn-lg text-white p-1 mr-1"/>
	}
}

export class VHomeDropdown extends VNotesDropDown {
	protected get dropdownActions(): DropdownAction[] {
		return [this.text, this.list, this.checkable, this.task, this.folder, this.space];
	}
}

export class  VSpaceDropdown extends VNotesDropDown {
	protected get dropdownActions(): DropdownAction[] {
		return [this.text, this.list, this.checkable, this.task, this.folder];
	}
}
