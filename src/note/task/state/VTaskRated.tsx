import React from 'react';
import { VTaskView } from './VTaskView';

export class VTaskRated extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		return this.renderStateSpan('已评价', true);
	}
}
