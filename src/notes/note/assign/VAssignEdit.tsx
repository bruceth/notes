import React from 'react';
//import { VNoteForm } from '../views/VNoteForm';
import { CNoteAssign } from "./CNoteAssign";
import { VNoteBaseEdit } from 'notes/noteBase';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

export class VAssignEdit extends VNoteBaseEdit<CNoteAssign> { // VNoteForm<CNoteAssign> {
	header() {
		return this.t('assign');
	}

	protected renderEditBottom():JSX.Element {
		return <div className="py-2 pl-3 bg-light border-top d-flex">
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

	protected getSaveDisabled():boolean {
		return (this.controller.caption === undefined);
	}

	protected async onButtonSave(): Promise<void> {
		this.controller.cContent.checkHaveNewItem?.();
		await this.controller.SetNote();
		this.closePage();
	}

	protected renderExButtons():JSX.Element {
		return <>this.renderDeleteButton()</>;
	}
	
}
