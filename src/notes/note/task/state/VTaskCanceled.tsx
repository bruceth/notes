//import React from 'react';
import { VTaskView } from './VTaskView';

export class VTaskCanceled extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		return this.renderStateSpan('已取消', true);
	}
}
