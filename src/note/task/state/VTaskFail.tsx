import React from 'react';
import { VTaskView } from './VTaskView';

export class VTaskFail extends VTaskView {
	protected get allowCheck() { return false; }
	protected renderState() {
		return this.renderStateSpan('拒签', true);
	}
}
