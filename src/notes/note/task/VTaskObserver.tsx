import { VTaskView } from './VTaskView';
import { CTaskObserver } from './CTaskObserver';

export class VTaskObserver extends VTaskView<CTaskObserver> {
	protected renderState() {
		let state = this.controller.taskStateResult;
		return this.renderStateSpan(state.content, state.isEnd);
	}
}

export class VTaskObserverDir extends VTaskObserver {
	render() {
		return this.renderDirView();
	}
}