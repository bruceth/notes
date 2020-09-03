import React from 'react';
import { CNoteAssign } from "./CNoteAssign";
import { VNoteBaseEdit } from 'notes/noteBase';

export class VAssignEdit extends VNoteBaseEdit<CNoteAssign> { // VNoteForm<CNoteAssign> {
	header() {
		return this.t('noteTask');
	}

	protected renderContent():JSX.Element {
		return this.controller.cContent.renderInput()
	}

	protected renderExButtons():JSX.Element {
		return <>{this.renderDeleteButton()}</>;
	}
}
