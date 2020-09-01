import React from 'react';
import { CNoteText } from "./CNoteText";
import { DropdownActions, DropdownAction } from 'tonva';
import { EnumContentType } from 'notes/components';
import { VNoteBaseEdit } from 'notes/noteBase/VNoteBaseEdit';
import { observer } from 'mobx-react';

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

	protected renderExButtons():JSX.Element {
		return this.renderDeleteButton();
	}

	protected renderButtonLeft():JSX.Element { 
		return <DropdownActions actions={this.dropdownActions} icon="th-list" itemIconClass="text-info" isRight={false}
		className="cursor-pointer btn btn-lg p-1 mr-1"/>;
	}

	protected dropdownActions: DropdownAction[] = [
		{icon:'file-o', caption:this.t('noteText'), action: ()=>this.actionSwitchType(EnumContentType.text)},
		{icon:'list', caption:this.t('noteList'), action: ()=>this.actionSwitchType(EnumContentType.list)},
		{icon:'check-square-o', caption:this.t('noteCheckable'), action: ()=>this.actionSwitchType(EnumContentType.checkable)},
	];

	protected actionSwitchType(type: number) {
	 	//this.changed = true;
	 	//this.controller.onCheckableChanged(type);
	}
}
