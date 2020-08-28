import React from 'react';
import { VTaskView } from './VTaskView';

export class VTaskDone extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		let { noteItem } = this.controller;
		let obj = noteItem.obj;
		if (obj) {
			let { checker } = obj;
			if (checker) {
				return this.renderStateSpan('待验收');
			}
			let { rater } = obj;
			if (rater) {
				return this.renderStateSpan('待评分');
			}
		}
		return this.renderStateSpan('已办', true);
	}
}

