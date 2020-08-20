import React from 'react';
import { CFolderNoteItem } from "./CFolderNoteItem";
import { VRelatives, RelativeKey } from '../item/VRelatives';

export class VFolderRelatives extends VRelatives<CFolderNoteItem> {
	constructor(controller: CFolderNoteItem) {
		super(controller);
		this.relativeCur = 'to';
	}
	protected arr:RelativeKey[] = ['to', 'spawn', 'contain'];
}