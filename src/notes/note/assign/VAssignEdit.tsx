import React from 'react';
//import { VNoteForm } from '../views/VNoteForm';
import { CNoteAssign } from "./CNoteAssign";
import { VNoteBaseEdit } from 'notes/noteBase';

export class VAssignEdit extends VNoteBaseEdit<CNoteAssign> { // VNoteForm<CNoteAssign> {
	header() {
		return this.t('noteTask');
	}

	protected renderExButtons():JSX.Element {
		return <>{this.renderDeleteButton()}</>;
	}
}
