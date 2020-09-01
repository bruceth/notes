import React from 'react';
import { CNoteText } from "./CNoteText";
import { DropdownActions, DropdownAction } from 'tonva';
import { EnumContentType } from 'notes/components';
import { VNoteBaseEdit } from 'notes/noteBase/VNoteBaseEdit';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

export class VTextEdit extends VNoteBaseEdit<CNoteText> {
	protected renderEditBottom():JSX.Element {
		return <div className="py-2 pl-3 bg-light border-top d-flex">
			{this.renderButtonLeft()}
			<div className="mr-auto" />
			{React.createElement(observer(() => <>
				<button onClick={() => this.onButtonSave()}
					className="btn btn-primary mr-3" disabled={this.btnSaveDisabled}>
					保存
				</button>
			</>))}
			{this.renderExButtons()}
		</div>;
	}

	protected getSaveDisabled():boolean {
		return (this.controller.caption === undefined /*&& this.controller.changedNoteContent === undefined*/);
	}

	@computed protected get btnSaveDisabled():boolean {
		if (this.controller.cContent.changed) return false;
		if (this.changed === true) return false;
		return this.getSaveDisabled();
	}

	protected async onButtonSave(): Promise<void> {
		//this.checkInputAdd();
		this.controller.cContent.checkHaveNewItem?.();
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
		{icon:'file-o', caption:this.t('noteText'), action: ()=>this.actionSwitchType(EnumContentType.text)},
		{icon:'list', caption:this.t('noteList'), action: ()=>this.actionSwitchType(EnumContentType.list)},
		{icon:'check-square-o', caption:this.t('noteCheckable'), action: ()=>this.actionSwitchType(EnumContentType.checkable)},
	];

	private actionSwitchType(type: number) {
	 	//this.changed = true;
	 	//this.controller.onCheckableChanged(type);
	}
}
