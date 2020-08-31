import React from 'react';
import { VNoteForm } from '../views/VNoteForm';
import { CNoteTask } from "./CNoteTask";

export class VEdit extends VNoteForm<CNoteTask> {
	protected get back(): 'close' | 'back' | 'none' {return 'close'}
	header() { return this.t('task') }

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
		//this.checkInputAdd();
		await this.controller.SetNote();
		this.closePage();
	}

	protected renderExButtons():JSX.Element {
		return;
	}
	*/
}
