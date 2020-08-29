//import React from 'react';
import { VNoteBase } from "./VNoteBase";
import { CNoteBase } from "./CNoteBase";
import { VRelatives } from './VRelatives';

export class VNoteBaseView<T extends CNoteBase> extends VNoteBase<T> {
	protected renderRelatives() {
		return this.renderVm(VRelatives);
	}
}