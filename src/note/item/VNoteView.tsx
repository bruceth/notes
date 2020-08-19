import React from 'react';
import { VNoteBase } from "./VNoteBase";
import { CNoteItem } from "./CNoteItem";
import { VRelatives } from './VRelatives';

export class VNoteView<T extends CNoteItem> extends VNoteBase<T> {
	protected renderRelatives() {
		return this.renderVm(VRelatives);
	}
}