//import React from "react";
import { CNoteAssign } from './CNoteAssign';
import { VNoteBaseAdd } from 'notes/noteBase';

export class VAdd extends VNoteBaseAdd<CNoteAssign> {
	header() {
		return this.t('assign');
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
