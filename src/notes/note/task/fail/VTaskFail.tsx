//import React from 'react';
import { VTaskView } from '../VTaskView';
import { CTaskFail } from './CTaskFail';

export class VTaskFail extends VTaskView<CTaskFail> {
	protected renderState() {
		return this.renderStateSpan('拒签', true);
	}
}
