//import React from 'react';
import { VTaskView } from '../VTaskView';
import { CTaskCanceled } from './CTaskCanceled';

export class VTaskCanceled extends VTaskView<CTaskCanceled> {
	protected get allowCheck() { return false; }
	protected renderState() {
		return this.renderStateSpan('已取消', true);
	}
}
