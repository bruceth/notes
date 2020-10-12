import { numberFromId } from "../../model";
import { CNoteTask } from "./CNoteTask";
import { TaskStateResult, getTaskItemState } from "./TaskState";
import { VTaskObserver, VTaskObserverDir } from "./VTaskObserver";

export class CTaskObserver extends CNoteTask {	
	get allowCheck() { return this.isMe(this.noteItem.owner); }

	showViewPage():void {this.openVPage(VTaskObserver);};
	renderDirItem(index: number): JSX.Element {
		return this.renderView(VTaskObserverDir);
	}
	get taskStateResult(): TaskStateResult {
		return getTaskItemState(this.noteItem);
	}
}
