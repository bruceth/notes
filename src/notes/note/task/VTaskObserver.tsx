import React from 'react';
import { VTaskView } from './VTaskView';
import { CTaskObserver } from './CTaskObserver';

export class VTaskObserver extends VTaskView<CTaskObserver> {
	protected renderState() {
		let state = this.controller.taskStateResult;
		return this.renderStateSpan(state.content, state.isEnd);
	}

	protected renderFooter() {
		return <div className="py-2 pl-3 bg-light border-top d-flex align-items-center">
			{this.controller.cComments?.renderWriteComment()}
		</div>;
	}
}

export class VTaskObserverDir extends VTaskObserver {
	render() {
		return this.renderDirView();
	}
}