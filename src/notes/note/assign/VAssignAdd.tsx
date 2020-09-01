import React from "react";
import { CNoteAssign } from './CNoteAssign';
import { VNoteBaseAdd } from 'notes/noteBase';
import { observer } from "mobx-react";
import { computed } from "mobx";

export class VAssignAdd extends VNoteBaseAdd<CNoteAssign> {
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

	protected async onButtonSave(): Promise<void> {
		//this.checkInputAdd();
		//let type = EnumNoteType.assign;
		await this.controller.AddNote(this.parentId);
		this.closePage();
		return;
	}

	protected onSaveAndSendNote = async () => {
		//this.checkInputAdd();
		//let type = EnumNoteType.assign;
		let cnewNote = await this.controller.AddNote(this.parentId);
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}
}
