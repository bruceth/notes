//import React from 'react';
import { VTaskView } from './VTaskView';

export class VTaskPass extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		let { noteItem } = this.controller;
		let obj = noteItem.obj;
		if (obj) {
			let { rater } = obj;
			if (rater) {
				return this.renderStateSpan('待评价');
			}
		}
		return this.renderStateSpan('已验收', true);
	}
}
