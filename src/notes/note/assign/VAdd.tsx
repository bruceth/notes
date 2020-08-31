//import React from "react";
import { VAddNoteBase } from '../views/VAddNoteBase';
import { CNoteAssign } from './CNoteAssign';
import { EnumNoteType } from 'notes/model';

export class VAdd extends VAddNoteBase<CNoteAssign> {
	header() {
		return this.t('assign');
	}

	protected async onButtonSave(): Promise<void> {
		//this.checkInputAdd();
		let type = EnumNoteType.assign;
		await this.controller.AddNote(this.parentId);
		this.closePage();
		return;
	}

	protected onSaveAndSendNote = async () => {
		//this.checkInputAdd();
		let type = EnumNoteType.assign;
		let cnewNote = await this.controller.AddNote(this.parentId);
		this.closePage();
		await cnewNote.cApp.loadRelation();
		cnewNote.showTo(1);
	}
}
