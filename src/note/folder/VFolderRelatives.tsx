import React from 'react';
import { CFolderNoteItem } from "./CFolderNoteItem";
import { VRelatives } from '../item/VRelatives';
import { RelativeKey } from 'note/item';

export class VFolderRelatives extends VRelatives<CFolderNoteItem> {
	constructor(controller: CFolderNoteItem) {
		super(controller);
	}
	protected arr:RelativeKey[] = ['to', 'spawn', 'contain'];
}