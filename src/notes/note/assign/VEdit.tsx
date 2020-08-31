import React from 'react';
import { VNoteForm } from '../views/VNoteForm';
import { CNoteAssign } from "./CNoteAssign";

export class VEdit extends VNoteForm<CNoteAssign> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() {
		return this.t('assign');
	}

	protected getSaveDisabled():boolean {
		return (this.controller.title === undefined/* && this.controller.changedNoteContent === undefined*/);
	}

	protected async onButtonSave(): Promise<void> {
		//this.checkInputAdd();
		await this.controller.SetNote();
		this.closePage();
	}

	protected renderExButtons():JSX.Element {
		return <>this.renderDeleteButton()</>;
	}
	
}
