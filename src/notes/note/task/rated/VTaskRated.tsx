//import React from 'react';
import { VTaskView } from '../VTaskView';
import { CTaskRated } from './CTaskRated';

export class VTaskRated extends VTaskView<CTaskRated> {
	protected get allowCheck() { return false; }
	protected renderState() {
		return this.renderStateSpan('已评价', true);
	}
}
