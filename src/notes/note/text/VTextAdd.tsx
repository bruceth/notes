import React from "react";
import { CNoteText } from './CNoteText';
import { VNoteBaseAdd } from "notes/noteBase";
import { observer } from "mobx-react";
import { DropdownActions, DropdownAction } from "tonva";
import { EnumContentType } from "notes/components";
import { computed } from "mobx";

export class VTextAdd extends VNoteBaseAdd<CNoteText> {
	header() {return '新建文字单'}

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

	@computed protected get btnSaveDisabled():boolean {
		if (this.controller.cContent.changed) return false;
		if (this.changed === true) return false;
		return this.getSaveDisabled();
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
