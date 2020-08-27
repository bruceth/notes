import React from 'react';
import { VRelatives } from '../../item/VRelatives';
import { RelativeKey } from 'note/item';
import { CTaskNoteItem } from '../CTaskNoteItem';

export class VTaskRelatives extends VRelatives<CTaskNoteItem> {
	constructor(controller: CTaskNoteItem) {
		super(controller);
	}
	protected arr:RelativeKey[] = ['comment'];

	render() {
		return super.render();
	}
}
