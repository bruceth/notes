import React from 'react';
import { VRelatives } from '../item/VRelatives';
import { RelativeKey } from 'note/item';
import { CTextNoteItem } from './CTextNoteItem';

export class VTextRelatives extends VRelatives<CTextNoteItem> {
	constructor(controller: CTextNoteItem) {
		super(controller);
	}
	protected arr:RelativeKey[] = ['comment', 'to', 'spawn'];

	render() {
		return super.render();
	}
}
