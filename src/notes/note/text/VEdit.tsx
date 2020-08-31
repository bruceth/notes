import React from 'react';
import { VNoteForm } from '../views/VNoteForm';
import { CNoteText } from "./CNoteText";
//import { DropdownAction, DropdownActions } from 'tonva';

export class VEdit extends VNoteForm<CNoteText> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {
		return this.t('noteText');
	}

	content() {
		return <div className="bg-white">
			{this.renderTitleInput()}
			{this.controller.cContent.renderInput()}
		</div>;
	}
	/*
	protected getSaveDisabled():boolean {
		return (this.controller.title === undefined && this.controller.changedNoteContent === undefined);
	}

	protected async onButtonSave(): Promise<void> {
		this.checkInputAdd();
		await this.controller.SetNote();
		this.closePage();
	}

	protected renderExButtons():JSX.Element {
		return this.renderDeleteButton();
	}

	protected renderButtonLeft():JSX.Element { 
		return <DropdownActions actions={this.dropdownActions} icon="th-list" itemIconClass="text-info" isRight={false}
		className="cursor-pointer btn btn-lg p-1 mr-1"/>;
	}

	private dropdownActions: DropdownAction[] = [
		{icon:'file-o', caption:this.t('noteText'), action: ()=>this.actionSwitchType(0)},
		{icon:'list', caption:this.t('noteList'), action: ()=>this.actionSwitchType(2)},
		{icon:'check-square-o', caption:this.t('noteCheckable'), action: ()=>this.actionSwitchType(1)},
	];

	private actionSwitchType(type: number) {
	 	this.changed = true;
	 	//this.controller.onCheckableChanged(type);
	}
	*/
}
